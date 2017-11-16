import React, { PureComponent } from 'react'
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay'

class Todo extends PureComponent {
  render() {
    const { data } = this.props
    return (
      <li key={data.id}>
        <div
          style={{ textDecoration: data.status == 'Active' ? 'none' : 'line-through' }}
        >
          {data.title}
          <button>X</button>
        </div>
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