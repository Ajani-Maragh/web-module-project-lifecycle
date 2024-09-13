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
        <div id='todos'>
          <h2>Todos:</h2>
        
        {
          this.state.todos.reduce((acc, td) => {
            if (this.state.displayCompleted || !td.completed) return acc.concat(
              <div onClick={this.toggleCompleted(td.id)}key={td.key}>{td.name} {td.completed ? " ✔️" : ""}</div>
            )
              return acc
          }, [])
        //(todo => {return <div onClick={this.toggleCompleted(todo.id)}key={todo.key}>{todo.name} {todo.completed ? " ✔️" : ""}</div>})
        }
        </div>
        <form id='todoForm' onSubmit={this.onTodoFormSubmit}>
        <input 
        value={this.state.todoNameInput} 
        onChange={this.onTodoNameInputChange} 
        type='text' 
        placeholder='type todo'/>
        <input type='submit'></input>
        </form>
        <button onClick={this.toggleDisplayCompleted}>{this.state.displayCompleted ? 'hide' : 'show'} completed</button>
      </div>
    )
  }
}
