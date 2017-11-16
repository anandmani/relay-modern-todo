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

export const getResolver = (db) => ({

  app: () => new App(db),

  addTodo: async ({ input }) => {
    let { title, status } = input
    let response = await db.collection('todos').insertOne({ title, status })
    let todo = response.ops[0]
    return {
      id: todo._id,
      ...todo
    }
  },

  updateTodo: async ({ input }) => {
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
  },

  deleteTodo: async ({ input }) => {
    let { id } = input
    let findObj = { _id: new ObjectID(id) }
    try {
      let response = await db.collection('todos').removeOne(findObj)
    } catch (err) {
      throw (err)
    }
    return "Success"
  }
})

/* Graphiql queries and mutations:

{
  todos(status: "active") {
    id,
    title,
    status
  }
}

mutation {
  deleteTodo(id: "5a0c2b0e93a72851aba392dd")
}

mutation{
  updateTodo(id: "5a0c176bf36d283a6cbc1f89", status: "Active"){
    id
    title
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