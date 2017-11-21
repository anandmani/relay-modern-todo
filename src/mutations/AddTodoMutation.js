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

export function commit(environment, title, args) {
  console.log("args", args)
  const optimisticID = Math.random().toString(32).substring(2)
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
      onCompleted: (response) => {
        console.log('add todo mutation', response)
      },
      onError: err => console.error(err),
      updater: (proxyStore, data) => {
        let addTodoProxy = proxyStore.getRootField('addTodo')
        
        const rootProxy = proxyStore.getRoot()
        let appProxy = rootProxy.getLinkedRecord('app')
        let todosProxy = appProxy.getLinkedRecords('todos', args)
        appProxy.setLinkedRecords([...todosProxy, addTodoProxy], 'todos', args)
      },
      optimisticUpdater: (proxyStore) => {
        const optimisticNodeProxy = proxyStore.get(optimisticID)

        const rootProxy = proxyStore.getRoot()
        let appProxy = rootProxy.getLinkedRecord('app')
        let todosProxy = appProxy.getLinkedRecords('todos', args)
        appProxy.setLinkedRecords([...todosProxy, optimisticNodeProxy], 'todos', args)
      },
      optimisticResponse: {
        addTodo: {
          id: optimisticID,
          title: `${title} (optimistic)`,
          status: 'Active'
        }
      }
    }
  )
}