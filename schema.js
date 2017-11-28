import { GraphQLSchema, GraphQLID, GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql'
import { connectionArgs, mutationWithClientMutationId, connectionDefinitions, connectionFromPromisedArray, globalIdField, fromGlobalId, toGlobalId, nodeDefinitions } from 'graphql-relay'
import { ObjectID } from 'mongodb'

export default (db) => {

  console.log("globalid", toGlobalId("Todo", "5a0c176bf36d283a6cbc1f89"))

  const getTodo = (id) => db.collection('todos').findOne({ _id: new ObjectID(id) })

  //Object identification
  //Graphql has a globally unique ID for every object so that it can re-fetch that object alone.  This globalId is created with objectType and localId eg. toGlobalId("todo", "1")
  const { nodeInterface, nodeField } = nodeDefinitions(
    async (globalId) => {                                               //Resolving the object, given a gloablID
      const { type, id } = fromGlobalId(globalId)
      if (type === 'Todo') {
        const obj = await getTodo(id)
        return obj
      }
    },
    (obj) => {                                                    //Mapping the object to an objectType. The argument is the resolved object from the above function
      return todoType                                             //We have only one objectType. Thus, we return it
    }
  )

  const todoType = new GraphQLObjectType({
    name: 'Todo',
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


  const addTodoMutation = mutationWithClientMutationId({
    name: 'AddTodo',  //mandatory field. Esle relay messes up when adding other unnamed mutations
    inputFields: {
      title: { type: GraphQLString },
      status: { type: GraphQLString }
    },
    mutateAndGetPayload: async (args) => {
      let { title, status } = args
      const response = await db.collection('todos').insertOne({ title, status })
      return response.ops[0]
    },
    outputFields: {
      todo: {
        type: todoType,
        resolve: (payload) => { //payload returned in the previous fn
          return payload
        }
      }
    }
  })

  const updateTodoMutation = mutationWithClientMutationId({
    name: 'UpdateTodo',
    inputFields: {
      id: { type: GraphQLID },
      status: { type: GraphQLString }
    },
    mutateAndGetPayload: async ({ id, status }) => {
      let findObj = { _id: new ObjectID(id) }
      let updateObj = { $set: { status } }
      let response = await db.collection('todos').findOneAndUpdate(findObj, updateObj, { returnOriginal: false })
      let { value: todo } = response
      return todo
    },
    outputFields: {
      todo: {
        type: todoType,
        resolve: (payload) => payload
      }
    }
  })

  const deleteTodoMutation = mutationWithClientMutationId({
    name: 'DeleteTodo',
    inputFields: {
      id: { type: GraphQLID }
    },
    mutateAndGetPayload: async ({ id }) => {
      let findObj = { _id: new ObjectID(id) }
      let response = await db.collection('todos').removeOne(findObj)
      return {} //returning empty obj instead on null, as relay throws an error: "Cannot set clientMutationId of null"
    },
    outputFields: {
      todo: {
        type: GraphQLString,
        resolve: _ => "success"
      }
    }
  })

  const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addTodo: addTodoMutation,
      updateTodo: updateTodoMutation,
      deleteTodo: deleteTodoMutation
    }
  })


  const appType = new GraphQLObjectType({
    name: 'App',
    fields: {
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

  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      node: nodeField,        //Fetch any deeply nested node alone, with a globalID
      app: {
        type: appType,
        resolve: () => ({}) 
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
#1  Fetch Todos
query todosQuery{
  app{
		todos {
		  edges {
		    node {
		      id
          title
		    }
		  }
		}
  }
}


#2  Fetch a node alone
query{
	node(id: "VG9kbzo1YTBjMTc2YmYzNmQyODNhNmNiYzFmODk=") {
	  id
	}
}

#3  AddTodoMutation
mutation {
	addTodo(input: {title: "sample", status: "Active"}){
    clientMutationId
    todo{
      id
      title
      status
    }
  }
}

#4 UpdateTodoMutation
mutation updateTodoMutation{
  updateTodo(input:{id: "5a1d5c33b9331fe86b180cec",status: "Done"}){
    todo{
      id
      title
      status
    }
  }
}

#5 DeleteTodoMutation
mutation{
  deleteTodo(input:{id: "5a1d5a00b9331fe86b180ceb" }) {
    todo
  }
}

*/



