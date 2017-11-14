import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import Main from './Main'

class App extends PureComponent {
  render() {
    return (
      <div>
        <Main />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react'))