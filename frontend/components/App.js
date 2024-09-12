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
  resetForm = () => this.setState({ ...this.state, todoNameInput: '' })
  setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message })
  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
    .then(res => {
      this.fetchAllTodos()
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
  }
  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
    
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(this.setAxiosResponseError)
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id='error'>ERROR: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
        
        {
          this.state.todos.map(todo => {
            return <div key={todo.key}>{todo.name}</div>
          })
        }
        </div>
        <form id='todoForm' onSubmit={this.onTodoFormSubmit}>
        <input 
        value={this.state.todoNameInput} 
        onChange={this.onTodoNameInputChange} 
        type='text' 
        placeholder='type todo'/>
        <input type='submit'></input>
        <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
