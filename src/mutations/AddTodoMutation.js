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
        let appProxy = rootProxy.getLinkedRecord('app')
        let todosProxy = appProxy.getLinkedRecords('todos')
        let addTodoProxy = proxyStore.getRootField('addTodo')
        appProxy.setLinkedRecords([...todosProxy, addTodoProxy], 'todos')
      }
    }
  )
}