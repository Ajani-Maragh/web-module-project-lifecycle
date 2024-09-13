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
      completed: false,
      displayCompleted: true,
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
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
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
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.map(td => {
        if (td.id !== id) return td
        return res.data.data
      }) })
    })
    .catch(this.setAxiosResponseError)
  }
  toggleDisplayCompleted = () => {
   this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted }) 
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  
  render() {
    return (
      <div>
        <div id='error'>ERROR: {this.state.error}</div>
          <TodoList 
          displayCompleted={this.state.displayCompleted}
          todos={this.state.todos}
          toggleCompleted={this.toggleCompleted}
        />
          <Form 
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoNameInputChange={this.onTodoNameInputChange}
          toggleDisplayCompleted={this.toggleDisplayCompleted}
          todoNameInput={this.state.todoNameInput}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}
