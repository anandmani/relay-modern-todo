import { Environment, Network, RecordSource, Store } from 'relay-runtime'

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return (
    fetch('/graphql', {
      method: 'POST',
      headers: {
        //Auth headers
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    })
      .then(response => response.json())
  )
}

const source = new RecordSource()
const store = new Store(source)
const network = Network.create(fetchQuery)

const environment = new Environment({
  network,
  store
})

export default environment
