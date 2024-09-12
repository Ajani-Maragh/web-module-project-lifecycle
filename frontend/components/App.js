import React from 'react'
import Form from "./Form"
import TodoList from "./TodoList"
import ReactDOM from "react-dom"

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    console.log("constructor invoked")
    super();
    this.state = {
      todos: [],
      name: '',
      completed: false
    }
  }
  handleInputChange = (event) => {
    this.setState({ name: event.target.value })
  }
  handleAddTodo = (event) => {
    event.preventdefault()
    const newTodo = {
      name: this.state.name,
      completed: false,
    }
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
      name: '',
    }))
  }

  componenetDidMount() {
    console.log("CDM invoked")
    fetch(URL)
      .then(res => res.json())
      .then(data => this.setState({ todos: data }))
      .catch(err => console.log(err.message))
    }
  render() {
    console.log("render invoked")
    return (
      <div>
        <TodoList todos={this.state.todos}/>
        <Form
        name={this.state.name}
        handleInputChange={this.handleInputChange}
        handleAddTodo={this.handleAddTodo} />
      </div>
    )
  }
}
