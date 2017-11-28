import { GraphQLSchema, GraphQLID, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql'
import { connectionArgs, connectionType, connectionDefinitions, connectionFromArray, connectionFromPromisedArray, globalIdField, fromGlobalId, toGlobalId, nodeDefinitions } from 'graphql-relay'
import { ObjectID } from 'mongodb'

export default (db) => {

  // console.log("globalid", toGlobalId("todo", "5a0c176bf36d283a6cbc1f89"))

  const getTodo = (id) => db.collection('todos').findOne({ _id: new ObjectID(id) })

  //Object identification
  //Graphql has a globally unique ID for every object so that it can re-fetch that object alone.  This globalId is created with objectType and localId eg. toGlobalId("todo", "1")
  const { nodeInterface, nodeField } = nodeDefinitions(
    async (globalId) => {                                               //Resolving the object, given a gloablID
      const { type, id } = fromGlobalId(globalId)
      if (type === 'todo') {
        const obj = await getTodo(id)
        return obj
      }
    },
    (obj) => {                                                    //Mapping the object to an objectType. The argument is the resolved object from the above function
      return todoType                                             //We have only one objectType. Thus, we return it
    }
  )

  const todoType = new GraphQLObjectType({
    name: 'todo',
    fields: {
      id: {                                                       //Relay needs an id field to use as localId, so we need to resolve _id to id
        type: new GraphQLNonNull(GraphQLID),
        resolve: (obj) => obj._id
      },
      title: { type: GraphQLString },                             //These fields are resolved automatically
      status: { type: GraphQLString }
    },
    interfaces: [nodeInterface]                                   //To fetch this node directly at root level in the query. refer SAMPLE QUERIES #2
  })


  const { connectionType: todoConnection } = connectionDefinitions({ nodeType: todoType }) //connectionDefinitions- make a connectionDefinitions from a graphqlObject definition



  const mutationType = new GraphQLObjectType({
    name: 'mutation',
    fields: {
      addTodo: {
        type: todoType,
        args: {
          title: { type: GraphQLString },
          status: { type: GraphQLString }
        },
        resolve: async (_, args) => {
          const { title, status } = args
          const response = await db.collection('todos').insertOne({ title, status })
          return response.ops[0]
        }
      }
    }
  })


  const queryType = new GraphQLObjectType({
    name: 'query',
    fields: {
      node: nodeField,        //Fetch any deeply nested node alone, with a globalID
      todos: {
        id: globalIdField('todos'),
        type: todoConnection,
        args: connectionArgs, //params for pagination
        resolve: (_, args) => {
          const todosPromise = db.collection('todos').find({}).toArray()
          return connectionFromPromisedArray(todosPromise, args) //connectionFromArray: take an array and make it edges[node{}]
        }
      }
    }
  })

  return new GraphQLSchema({
    query: queryType,
    mutation: mutationType
  })

}


/*

SAMPLE QUERIES:
#1
query todosQuery($input: Int){
	todos(first: $input) {
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

{
  "input": 4
}


#2
query{
  node(id: "dG9kbzo1YTBjMTc2YmYzNmQyODNhNmNiYzFmODk=") {
	  id
	}
}

#3
mutation {
  addTodo(title: "testp", status: "Active" ) {
    id
    title
    status
  }
}
*/



