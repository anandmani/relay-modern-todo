import { buildSchema, GraphQLID, GraphQLString } from 'graphql'
import { ObjectID } from 'mongodb'

export const schema = buildSchema(`
  type Todo{
    id: String!
    title: String!
    status: String!
  }
  input TodoInput{
    title: String!
    status: String
  }
  input UpdateTodoInput{
    id: String!
    status: String!
  }
  input DeleteTodoInput{
    id: String!
  }
  type App{
    todos(status: String): [Todo]
  }
  type Query{
    app: App
  }
  type Mutation{
    addTodo(input: TodoInput): Todo
    updateTodo(input: UpdateTodoInput): Todo
    deleteTodo(input: DeleteTodoInput): String
  }
`)

class App {
  constructor(db) {
    this.db = db
  }
  async todos({ status }) {
    let findObj = {}
    if (status) {
      findObj.status = new RegExp(status, 'i')
    }
    let todos = await this.db.collection('todos').find(findObj).toArray()
    return todos.map(todo => ({
      id: todo._id,
      ...todo
    }))
  }
}

const authenticate = (resolver) => (...args) => {
  const context = args[1]
  if (!context.username) {
    throw "Login to perform writes!"
  }
  return resolver(...args)
}

export const getResolver = (db) => ({

  app: () => new App(db),

  // addTodo: async ({ input }, context) => {   //The Mutation without authentication "as a middleware"
  //   if (!context.username) {
  //     throw "Not logged in"
  //   }
  //   let { title, status } = input
  //   let response = await db.collection('todos').insertOne({ title, status })
  //   let todo = response.ops[0]
  //   return {
  //     id: todo._id,
  //     ...todo
  //   }
  // },

  addTodo: authenticate(
    async ({ input }) => {
      console.log("addTodo", input)
      let { title, status } = input
      let response = await db.collection('todos').insertOne({ title, status })
      let todo = response.ops[0]
      return {
        id: todo._id,
        ...todo
      }
    },
  ),

  updateTodo: authenticate(async ({ input }) => {
    let { id, status } = input
    let findObj = { _id: new ObjectID(id) }
    let updateObj = { $set: { status } }
    let response = await db.collection('todos').findOneAndUpdate(findObj, updateObj, { returnOriginal: false })
    let { value: todo } = response
    if (!response.lastErrorObject) {
      throw err
    }
    else {
      return {
        id: todo._id,
        ...todo
      }
    }
  }),

  deleteTodo: authenticate(async ({ input }) => {
    let { id } = input
    let findObj = { _id: new ObjectID(id) }
    try {
      let response = await db.collection('todos').removeOne(findObj)
    } catch (err) {
      throw (err)
    }
    return "Success"
  })

})

/* Graphiql queries and mutations:

================================ Queries ================================

{
  app{
    todos(status: "Active") {
      id
      title
      status
    }
  }
}

================================ Mutations ================================

mutation AddTodoMutation($input: TodoInput){
  addTodo(input: $input){
    id
    title
    status
  }
}

{
  "input": {
  	"title": "Test123",
    "status": "Completed"
	}
}
-----------------------------

mutation UpdateTodoMutation($input: UpdateTodoInput){
  updateTodo(input: $input){
    id
    title
    status
  }
}

{
  "input": {
    "id": "5a13e75dc4e2d52dc1dce453",
    "status": "Active"
	}
}
------------------------------

mutation DeleteTodoMutation($input: DeleteTodoInput){
  deleteTodo(input: $input)
}

{
  "input": {
    "id": "5a13e75dc4e2d52dc1dce453"
	}
}

*/