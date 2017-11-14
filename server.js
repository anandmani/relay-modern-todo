import express from 'express'
import graphqlHTTP from 'express-graphql'
import { schema, resolver } from './schema'

let app = express()

app.use(express.static('public'))

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true
}))

app.listen(3000, () => console.log("Connected to Mongo \nListening on port 3k"))