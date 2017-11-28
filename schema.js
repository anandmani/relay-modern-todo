import { GraphQLSchema, GraphQLID, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql'
import { connectionArgs, connectionType, connectionDefinitions, connectionFromArray, globalIdField, fromGlobalId, toGlobalId, nodeDefinitions } from 'graphql-relay'
import { ObjectID } from 'mongodb'

// console.log("globalid", toGlobalId("todo", "1"))
const todos = [
  { id: 0, title: 'a' },
  { id: 1, title: 'b' },
  { id: 2, title: 'c' },
  { id: 3, title: 'd' },
  { id: 4, title: 'e' }
]
const getTodo = (id) => todos.find(todo => todo.id == id)

//Object identification
//Graphql has a globally unique ID for every object so that it can re-fetch that object alone.  This globalId is created with objectType and localId eg. toGlobalId("todo", "1")
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {                                               //Resolving the object, given a gloablID
    const { type, id } = fromGlobalId(globalId)
    if (type === 'todo') {
      return getTodo(id)
    }
  },
  (obj) => {                                                    //Mapping the object to an objectType. The argument is the resolved object from the above function
    return todoType                                             //We have only one objectType. Thus, we return it
  }
)

const todoType = new GraphQLObjectType({
  name: 'todo',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString }
  },
  interfaces: [nodeInterface]                                   //To fetch this node directly at root level in the query. refer SAMPLE QUERIES #2
})


const { connectionType: todoConnection } = connectionDefinitions({ nodeType: todoType }) //connectionDefinitions- make a connectionDefinitions from a graphqlObject definition

const queryType = new GraphQLObjectType({
  name: 'query',
  fields: {
    node: nodeField,        //Fetch any deeply nested node alone, with a globalID
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

SAMPLE QUERIES:

#1
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

#2
query{
  node(id: "dG9kbzox") {
	  id
	}
}

*/



