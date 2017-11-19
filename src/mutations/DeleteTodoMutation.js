import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation DeleteTodoMutation($input: DeleteTodoInput){
    deleteTodo(input: $input)
  }
`
export function commit(environment, id) {
  commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          id
        }
      },
      onCompleted: (response) => console.log("Delete mutation response", response),
      onError: (err) => console.error(err),
      updater: (proxyStore, data) => {
        console.log("id", id)
        let deletedField = proxyStore.get(id)
        proxyStore.delete(id)
        console.log("deleted Field", deletedField)
        // console.log("proxyStore", proxyStore)
        let rootProxy = proxyStore.getRoot()
        // console.log("rootProxy", rootProxy)
        let appProxy = rootProxy.getLinkedRecord('app')
        let todosProxy = appProxy.getLinkedRecords('todos')
        console.log("todosProxy", todosProxy)
        // console.log("app", appProxy)
      }
    }
  )
}