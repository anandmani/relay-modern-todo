import React, { PureComponent } from 'react'
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay'
import * as UpdateTodoMutation from './mutations/UpdateTodoMutation'
import * as DeleteTodoMutation from './mutations/DeleteTodoMutation'

class Todo extends PureComponent {
  handleToggle = () => {
    console.log("toggling")
    const newStatus = this.props.data.status == 'Active' ? 'Completed' : 'Active'
    UpdateTodoMutation.commit(this.props.relay.environment, this.props.data.id, newStatus)
  }
  handleDelete = () => {
    console.log("deleting")
    DeleteTodoMutation.commit(this.props.relay.environment, this.props.data.id)
  }
  render() {
    const { data } = this.props
    return (
      <li key={data.id}>
        <div
          style={{
            textDecoration: data.status == 'Active' ? 'none' : 'line-through',
            display: 'inline-block',
            width: 200
          }}
          onClick={this.handleToggle}
        >
          {data.title}
        </div>
        <button onClick={this.handleDelete}>X</button>
      </li>
    )
  }
}

export default createFragmentContainer(
  Todo,
  graphql`
    fragment Todo on Todo{
      id
      title
      status
    }
  `
)