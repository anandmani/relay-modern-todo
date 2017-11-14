import React, { PureComponent } from 'react'

class Main extends PureComponent {

  renderRow = (todo) => (
    <li key={todo}>
      <div>
        todo
        <button>X</button>
      </div>
    </li>
  )

  render() {
    const todos = ['1', '2']
    return (
      <div>
        Todos:
        <br />
        <input ref='addRef' placeholder='Add todo..' />
        <ul>
          {
            todos.map(this.renderRow)
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

export default Main