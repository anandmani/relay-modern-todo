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

export function commit(environment, title, args, errorHandler) {
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
      onCompleted: (response, err) => {
        console.log('add todo mutation', response)
        if (err) { //If error happens after completion; onError is error before completion?
          errorHandler(err[0].message)
        }
      },
      onError: err => console.error(err),
      updater: (proxyStore, data) => {
        if (args.status !== 'Completed') { //Update the local store with new todo only if user is viewing all/active todos. If he is viewing completed todos, he will fetch the new todo when he changes to all/active
          let addTodoProxy = proxyStore.getRootField('addTodo')
          const rootProxy = proxyStore.getRoot()
          let appProxy = rootProxy.getLinkedRecord('app')
          let todosProxy = appProxy.getLinkedRecords('todos', args)
          appProxy.setLinkedRecords([...todosProxy, addTodoProxy], 'todos', args)
        }
      },
      optimisticUpdater: (proxyStore) => {
        if (args.status !== 'Completed') { //Update the local store with new todo only if user is viewing all/active todos. If he is viewing completed todos, he will fetch the new todo when he changes to all/active
          const optimisticNodeProxy = proxyStore.get(optimisticID)
          const rootProxy = proxyStore.getRoot()
          let appProxy = rootProxy.getLinkedRecord('app')
          let todosProxy = appProxy.getLinkedRecords('todos', args)
          appProxy.setLinkedRecords([...todosProxy, optimisticNodeProxy], 'todos', args)
        }
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