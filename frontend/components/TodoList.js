import React from 'react'
import Todo from "./Todo"

export default class TodoList extends React.Component {
  render() {
    const { todo } = this.props
    return (
      <div>
        {this.props.todos.map(todo => (
          <Todo todo={todo} key={todo.id}/>
        ))}
      </div>
    )
  }
}
