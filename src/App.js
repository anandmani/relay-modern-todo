import React, { PureComponent } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import Todo from './Todo'

class App extends PureComponent {

  renderRow = (todo) => <Todo key={todo.__id} data={todo} />

  render() {
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
        ...Todo
      }
    }
  `
)

// fragment App_propname
//not giving prop name, defaults to 'data' prop