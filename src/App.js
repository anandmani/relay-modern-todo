import React, { PureComponent } from 'react'
import { createFragmentContainer, createRefetchContainer, graphql } from 'react-relay'
import Todo from './Todo'
import * as AddTodoMutation from './mutations/AddTodoMutation'

class App extends PureComponent {

  renderRow = (todo) => todo ? <Todo key={todo.__id} data={todo} /> : null

  handleAdd = (e) => {
    e.preventDefault()
    let value = this.refs.addRef.value
    AddTodoMutation.commit(this.props.relay.environment, value)
    this.refs.addRef.value = ''
  }

  handleFilter = (e) => {
    const status = e.target.value
    console.log("filter by", status)
    const refetchVariables = {
      status
    }
    this.props.relay.refetch(refetchVariables)
  }

  render() {
    // console.log("App", this.props.relay.environment.getStore().getSource())
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
          <select defaultValue="" onChange={this.handleFilter}>
            <option value="">All</option>
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

// export default createRefetchContainer(
//   App,
//   graphql`
//     fragment App on App @argumentDefinitions( status: {type: "String", defaultValue: ""}){
//       todos(status: $status){
//         ...Todo
//       }
//     }
//   `
//   ,
//   graphql`
//     query AppRefetchQuery($status: String){
//       app{
//         ...App @arguments(status: $status)
//       }
//     }
//   `
// )


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
// not giving prop name, defaults to 'data' prop