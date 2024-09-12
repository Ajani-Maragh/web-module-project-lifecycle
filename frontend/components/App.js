import React from 'react'
import axios from "axios"
import Form from "./Form"
import TodoList from "./TodoList"

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
    }
  }
  onTodoNameInputChange = event => {
    const { value } = event.target
    this.setState({ ...this.state, todoNameInput: value })
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message })
    })
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  render() {
    return(
      <div>
        <div id='error'>ERROR: {this.state.error}</div>
        {
          this.state.todos.map(todo => {
            return <div key={todo.key}>{todo.name}</div>
          })
        }
        <Form />
        <input 
        value={this.state.todoNameInput} 
        type='text' 
        placeholder='type todo'
        onChange={this.onTodoNameInputChange} />
        <input type='button'/>
      </div>
    )
  }
}
