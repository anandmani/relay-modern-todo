import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import session from 'express-session'
import passport from 'passport'
import passportConfig from './passportConfig'
import cookieParser from 'cookie-parser'
import routes from './routes'
import { schema, getResolver } from './schema'
import { MongoClient } from 'mongodb'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'
import fs from 'fs'
const mongoUrl = 'mongodb://admin:admin@ds151355.mlab.com:51355/rgr'

let app = express();
app.use(express.static('public'));

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("auth true", req.user)
    return next()
  }
  else res.send('failed')
}

(
  async function connect() {
    try {
      let db = await MongoClient.connect(mongoUrl)

      function loggingMiddleware(req, res, next) {
        // console.log(req.session)
        next()
      }

      app.use(bodyParser.json())
      app.use(cookieParser())
      app.use(session({
        secret: 'relay',
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          maxAge: 60000,
          httpOnly: false
        }
      }))
      app.use(passport.initialize())
      app.use(passport.session())
      app.use(loggingMiddleware)

      passportConfig(passport, db)

      routes(app, db)

      app.get('/test',
        isAuthenticated,
        function (req, res) {
          res.send({})
        }
      )

      app.use(
        '/graphql',
        graphqlHTTP(req => {
          return {
            schema: schema,
            rootValue: getResolver(db),
            graphiql: true,
            context: req.user ? req.user : {}   //Cannot set it to undefined or null as it just replaced by Incoming network request for some reason
          }
        }
        )
      )

      app.listen(3000, () => console.log("Connected to Mongo \nListening on port 3k"))

      let json = await graphql(schema, introspectionQuery)
      fs.writeFile('schema.json', JSON.stringify(json, null, 2))
    } catch (err) {
      throw err
    }
  }
)()