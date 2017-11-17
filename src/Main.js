//Don't name file index.js. Some problem while name queries <filename><Query> format

import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from './environment'
import App from './App'

// import { installRelayDevTools } from 'relay-devtools'
// installRelayDevTools()

ReactDOM.render(
  <QueryRenderer
    environment={environment}
    query={graphql`
        query MainQuery{
          app{
            ...App
          }
        }
      `}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        return <App data={props.app} />
      }
      return <div>Loading...</div>
    }}
  />,
  document.getElementById('react')
)