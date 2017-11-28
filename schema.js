import { GraphQLSchema, GraphQLID, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql'
import { connectionArgs, connectionType, connectionDefinitions, connectionFromArray, globalIdField, fromGlobalId, nodeDefinitions } from 'graphql-relay'
import { ObjectID } from 'mongodb'

const todos = [
  { id: 0, title: 'a' },
  { id: 1, title: 'b' },
  { id: 2, title: 'c' },
  { id: 3, title: 'd' },
  { id: 4, title: 'e' }
]

const todoType = new GraphQLObjectType({
  name: 'todo',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString }
  }
})


const { connectionType: todoConnection } = connectionDefinitions({ name: 'todo', nodeType: todoType }) //connectionDefinitions- make a connectionDefinitions from a graphqlObject definition


const queryType = new GraphQLObjectType({
  name: 'query',
  fields: {
    todos: {
      id: globalIdField('todos'),
      type: todoConnection,
      args: connectionArgs, //params for pagination
      resolve: (_, args) => connectionFromArray(todos, args) //connectionFromArray: take an array and make it edges[node{}]
    }
  }
})

export const schema = new GraphQLSchema({
  query: queryType,
})


/*
query{
	todos (first: 2, after: "YXJyYXljb25uZWN0aW9uOjE"){
    pageInfo {
      startCursor
      endCursor
    }
	  edges {
	    node {
	      id
        title
	    }
	  }
	}
}
*/



