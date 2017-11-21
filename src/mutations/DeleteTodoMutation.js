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
        proxyStore.delete(id)
      },
      optimisticUpdater: (proxyStore) => {
        proxyStore.delete(id)
      }
    }
  )
}