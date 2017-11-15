import React, { PureComponent } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

class App extends PureComponent {

  renderRow = (todo) => (
    <li key={todo.id}>
      <div>
        {todo.title}
        <button>X</button>
      </div>
    </li>
  )

  render() {
    console.log("this.props", this.props)
    return (
      <div>
        Todos:
        <br />
        <input ref='addRef' placeholder='Add todo..' />
        <ul>
          {
            this.props.data.todos.map(this.renderRow)
          }
        </ul>
        <div>
          Filter:
          <select defaultValue='All'>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        Page Number:
        <select defaultValue='1'>
          <option value='1'>1</option>
          <option value='2'>2</option>
        </select>
      </div>
    )
  }

}

export default createFragmentContainer(
  App,
  graphql`
    fragment App on App{
      todos{
        id
        title
        status
      }
    }
  `
)

// fragment App_propname
//not giving prop name, defaults to 'data' prop