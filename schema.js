import { GraphQLSchema, GraphQLID, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList } from 'graphql'

import { ObjectID } from 'mongodb'

const todos = [
  { id: 0, title: 'Hello' },
  { id: 1, title: 'World' },
  { id: 2, title: 'World' },
  { id: 3, title: 'World' },
  { id: 4, title: 'World' }
]


const todoType = new GraphQLObjectType({
  name: 'todo',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString }
  }
})

const mutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addTodo: {
      type: new GraphQLList(todoType),
      args: {
        title: { type: GraphQLString }
      },
      resolve: (_, args) => {
        const { title } = args
        todos.push({
          id: todos.length,
          title
        })
        return todos
      }
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'query',
  fields: {
    todos: {
      type: new GraphQLList(todoType),
      resolve: () => todos
    }
  }
})

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})


/*
query{
	todos {
	  id
    title
	}
}

mutation{
  addTodo(title: "lol") {
    id
    title
  }
}
*/
