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
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        console.log("update todo", response)
      },
      onError: (err) => console.error(err)
    }
  )
}