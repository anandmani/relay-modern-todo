import express from 'express'
import graphqlHTTP from 'express-graphql'
import { schema, getResolver } from './schema'
import { MongoClient } from 'mongodb'
const mongoUrl = 'mongodb://admin:admin@ds151355.mlab.com:51355/rgr'

let app = express();
app.use(express.static('public'));

(
  async function connect() {
    let db = await MongoClient.connect(mongoUrl)

    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: getResolver(db),
      graphiql: true
    }))
    app.listen(3000, () => console.log("Connected to Mongo \nListening on port 3k"))
  }
)()




