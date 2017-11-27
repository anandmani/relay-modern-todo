import React, { PureComponent } from 'react'
import { createFragmentContainer, createRefetchContainer, graphql } from 'react-relay'
import Todo from './Todo'
import * as AddTodoMutation from './mutations/AddTodoMutation'
import { login, logout, test } from './actions'
import Cookies from 'js-cookie'

const styles = {
  selectContainer: { display: 'inline-block', marginRight: 15 },
  "ml-10": { marginLeft: 10 },
  green: { color: 'green' },
  red: { color: 'red' }
}

const errorHandler = (message) => window.alert(message)

class App extends PureComponent {

  state = {
    loggedIn: !!Cookies.get("connect.sid"),
    loginLoading: false
  }

  renderRow = (todo) => todo ? <Todo key={todo.__id} data={todo} /> : null

  handleAdd = (e) => {
    e.preventDefault()
    let value = this.refs.addRef.value
    AddTodoMutation.commit(this.props.relay.environment, value, { status: this.refs.filterRef.value }, errorHandler)
    this.refs.addRef.value = ''
  }

  handleFilter = (e) => {
    const status = e.target.value
    const refetchVariables = {
      status
    }
    this.props.relay.refetch(refetchVariables)
  }

  handleLogin = () => {
    this.setState({ loginLoading: true })
    login()
      .then(() => this.setState({ loggedIn: true, loginLoading: false }))
  }

  handleLogout = () => {
    logout()
    this.setState({ loggedIn: false, loginLoading: false })
  }

  render() {
    // console.log("Store Source", this.props.relay.environment.getStore().getSource())
    return (
      <div>
        {
          this.state.loginLoading ?
            <span>Loading...</span>
            :
            this.state.loggedIn ?
              <div>
                <span style={styles.green}>Writes enabled</span>
                <button onClick={this.handleLogout} style={styles["ml-10"]}>Logout</button>
              </div>
              :
              <div>
                <span style={styles.red}>Writes disabled</span>
                <button onClick={this.handleLogin} style={styles["ml-10"]}>Login</button>
              </div>
        }
        <br />
        {
          <button onClick={test}>Test</button>
        }
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

        <div style={styles.selectContainer}>
          <small>Filter:</small>
          <select defaultValue="" ref="filterRef" onChange={this.handleFilter}>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div style={styles.selectContainer}>
          <small>Page Number:</small>
          <select defaultValue='1'>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
        </div>
      </div>
    )
  }

}

export default createRefetchContainer(
  App,
  graphql`
    fragment App on App @argumentDefinitions( status: {type: "String", defaultValue: ""}){
      todos(status: $status){
        ...Todo
      }
    }
  `
  ,
  graphql`
    query AppRefetchQuery($status: String){
      app{
        ...App @arguments(status: $status)
      }
    }
  `
)


// export default createFragmentContainer(
//   App,
//   graphql`
//     fragment App on App{
//       todos{
//         ...Todo
//       }
//     }
//   `
// )

// fragment App_propname
// not giving prop name, defaults to 'data' prop