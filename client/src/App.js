import React, { Component } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import TodoList from './components/todos/TodoList';
import TodoForm from './components/todos/TodoForm';

class App extends Component {
  state = { todos: [] }
  componentDidMount() {
    // get all the todos records and set them to state
    axios.get('/api/todos')
    .then( res => {
      this.setState({ todos: res.data })
    })
    .catch( err => {
      console.log(err)
    })
    // axios
  }
  addTodo = (todo) => {
    // add the newTodo in the database using axios
    // { newTodo: {title: 'learn react', complete: true }}
    // { todo: {title: 'learn react', complete: true }}
    axios.post("/api/todos", { todo })
      .then( res => {
        // add the new todo to the state 
        const { todos } = this.state
        this.setState({ todos: [...todos, res.data] })
      })
      .catch( err => {
        console.log(err)
      })
  }
  updateTodo = (id, todo) => {
    // update the todo in the backend w/ axios
    // const todo = updatedTodo
    axios.put(`/api/todos/${id}`, { todo })
    .then( res => {
      // update the state with the updatedTodo
      const todos = this.state.todos.map( t => {
        if (t.id === id)
          return res.data
        return t
      })
      this.setState({ todos })
    })
    .catch( err => {
      console.log(err)
    })
  }
  deleteTodo = (id) => {
    // remove the todo in the backend w/ axios
    axios.delete(`/api/todos/${id}`)
    .then( res => {
      const { todos } = this.state
      // filter out the todo from state
      this.setState({ todos: todos.filter( t => t.id !== id )})
    })
    .catch( err => {
      console.log(err)
    })
  }
  render() {
    const { todos } = this.state
    return(
      <>
        <Header>Todo List App</Header>
        <TodoForm addTodo={this.addTodo} />
        <TodoList 
          todos={todos} 
          updateTodo={this.updateTodo} 
          deleteTodo={this.deleteTodo}
        />
      </>
    )
  }
}
export default App;