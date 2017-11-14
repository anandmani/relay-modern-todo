import { buildSchema, GraphQLID, GraphQLString } from 'graphql'

const todos = [
  {
    id: 0,
    title: 'Gym',
    status: 'Active'
  },
  {
    id: 1,
    title: 'Study',
    status: 'Active'
  },
  {
    id: 2,
    title: 'Dinner',
    status: 'Active'
  },
  {
    id: 3,
    title: 'Sleep',
    status: 'Active'
  }
]

export const schema = buildSchema(`
  type Todo{
    id: Int!
    title: String
    status: String
  }
  input TodoInput{
    title: String
    status: String
  }
  type Query{
    getTodos: [Todo]
  }
  type Mutation{
    addTodo(input: TodoInput): [Todo]
    toggleTodo(id: Int!): [Todo]
    deleteTodo(id: Int!): [Todo]
  }
`)

export const resolver = {

  getTodos: () => todos,

  addTodo: ({ input }) => {
    let { title, status } = input
    todos.push({
      id: todos.length,
      title,
      status
    })
    return todos
  },

  toggleTodo: ({ id }) => {
    let todo = todos.filter(todo => todo.id === id)[0]
    todo.status = todo.status === 'Active' ? 'Completed' : 'Active'
    return todos
  },

  deleteTodo: ({ id }) => {
    let deleteIndex
    todos.some((todo, index) => {
      if (todo.id === id) {
        deleteIndex = index
        return true
      }
      return false
    })
    console.log("deleteIndex", deleteIndex)
    if (deleteIndex) todos.splice(deleteIndex, 1)
    return todos
  }
}

/* Graphiql queries and mutations:

{
  getTodos {
    id,
    title,
    status
  }
}

mutation{
  deleteTodo(id: 2) {
    id
  }
}

mutation{
	toggleTodo(id: 3) {
    id,
    title,
    status
  }
}

mutation{
  addTodo(input: {title: "Dotay", status: "Completed"}){
    id
    title
    status
  }
}

*/