import React, { Component } from 'react';
import AddTodo from './addtodo.js';
import TodoList from './todoList.js';

import './todos.scss';

class Todos extends Component {
 
  render(){
    return (
      <div id="todos">
        <AddTodo />
        <TodoList />
      </div>
    )
  }
}

export default Todos;