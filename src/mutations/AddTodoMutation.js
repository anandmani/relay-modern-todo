import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation AddTodoMutation($input: TodoInput){
    addTodo(input: $input){
      id
      title
      status
    }
  }
`

export function commit(environment, title) {
  const variables = {
    input: {
      title,
      status: "Active"
    }
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        console.log('add todo mutation', response)
      },
      onError: err => console.error(err),
      updater: (proxyStore, data) => {
        const rootProxy = proxyStore.getRoot()
        console.log("root", rootProxy)
        let appProxy = rootProxy.getLinkedRecord('app')
        console.log("app", appProxy)
        let todosProxy = appProxy.getLinkedRecords('todos')

        let newId = data.addTodo.id
        // let newProxy  = proxyStore.get(newId)
        // let newRecord = newProxy.getLinkedRecord(newProxy.getValue())
        let addTodoProxy = proxyStore.getRootField('addTodo')
        console.log("addTodoProxy", addTodoProxy)


        // appProxy.setLinkedRecords(todosProxy, 'todos')
        // let todosProxy = appProxy.getValue('todos')

        // let node = proxyStore.create(data.addTodo.id, 'Todo')

        // let todosProxy = appProxy.getLinkedRecords('todos')
        // let last = todosProxy.pop()
      }
    }
  )
}