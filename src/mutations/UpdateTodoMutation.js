import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation UpdateTodoMutation($input: UpdateTodoInput){
    updateTodo(input: $input){
      id
      title
      status
    }
  }
`

export function commit(environment, id, status) {

  const variables = {
    input: {
      id,
      status
    }
  }

  const commonUpdater = (proxyStore) => {
    //The status of the todo doesn't have to changed as relay automatically reftches the fragment on which the mutation was called.
    //However, we need to update the todoList remove the todo from the todoList if view Active/Comepleted filters are applied
    const rootProxy = proxyStore.getRoot()
    let appProxy = rootProxy.getLinkedRecord('app')
    //If new todo status is 'Active', we need to remove it from  todo {status: "Compeletd"} record
    if (status == 'Active') {
      let todosProxy = appProxy.getLinkedRecords('todos', { status: 'Completed' })
      if (todosProxy) { //The record todos { status: 'Completed' } will not exist if it wasn't queried at all. Making that check
        let newTodosProxy = todosProxy.filter(todoProxy => id !== todoProxy.getDataID())
        appProxy.setLinkedRecords(newTodosProxy, 'todos', { status: 'Completed' })
      }
    }
    //If new todo status is 'Completed', we need to remove it from  todo {status: "Active"} record
    if (status == 'Completed') {
      let todosProxy = appProxy.getLinkedRecords('todos', { status: 'Active' })
      if (todosProxy) {
        let newTodosProxy = todosProxy.filter(todoProxy => id !== todoProxy.getDataID())
        appProxy.setLinkedRecords(newTodosProxy, 'todos', { status: 'Active' })
      }
    }
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        console.log("update todo", response)
      },
      onError: (err) => console.error(err),
      optimisticResponse: {
        updateTodo: {
          id,
          status
        }
      },
      updater: commonUpdater,
      optimisticUpdater: commonUpdater
    }
  )
}