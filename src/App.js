import React, { PureComponent } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import Todo from './Todo'
import * as AddTodoMutation from './mutations/AddTodoMutation'

class App extends PureComponent {

  renderRow = (todo) => <Todo key={todo.__id} data={todo} />

  handleAdd = (e) => {
    e.preventDefault()
    let value = this.refs.addRef.value
    console.log("value", value)
    AddTodoMutation.commit(this.props.relay.environment, value)
    this.refs.addRef.value = ''
  }

  render() {
    return (
      <div>
        Todos:
        <br />
        <form onSubmit={this.handleAdd}>
          <input ref='addRef' placeholder='Add todo..' />
          <button type='submit'>Add</button>
        </form>
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