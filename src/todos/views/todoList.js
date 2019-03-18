import React, { Component } from 'react';
import {connect} from 'react-redux';
import TodoItem from './todoItem.js';
import axios from '../../config/axios.js';
import { initTodos} from '../actions.js';

class TodoList extends Component {


  componentDidMount(){
    console.log('mount lists....')
    this.getInitTodos()
  }


  getInitTodos = async ()=>{
    try{
      const res = await axios.get('todos');
      const items = res.data.resources.map( t => Object.assign({},t,{editEnable:false}))
      this.props.initTodos(items)
    }catch(e){
      throw new Error(e)
    }
  }

  get unDeletedTodos(){
    return this.props.todoItems.filter( t => !t.deleted)
  }

  get unCompletedTodos(){
    return this.unDeletedTodos.filter( t=> !t.completed)
  }

  get completedTodos(){
    return this.unDeletedTodos.filter( t=> t.completed)
  }

  render(){
    return (
      <div id='todoList'>
         {  this.unCompletedTodos.map( t => <TodoItem key={t.id}  {...t} /> )}  
         {  this.completedTodos.map( t => <TodoItem key={t.id}  {...t} /> )}  
        <div>已完成</div>
      </div>
    )
  }
}


const mapStateToProps = (state)=>({
  todoItems: state
})


const mapDispatchToProps = (dispatch)=>{
  return {
    initTodos: (items)=> dispatch(initTodos(items))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TodoList);