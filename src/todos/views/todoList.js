import React, { Component } from 'react';
import {connect} from 'react-redux';
import TodoItem from './todoItem.js';
import {Icon} from 'antd';
import classNames from 'classnames';

class TodoList extends Component {

  constructor(props){
    super(props)
    this.state={
      showCompleted: false
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

  checkCompleted = ()=>{
    this.setState({showCompleted: !this.state.showCompleted})
  }

  render(){

    const completedListClass = classNames({
      'show': this.state.showCompleted
    })

    return (
      <div id='todoList'>

        <div id="uncompletedList">
          {  this.unCompletedTodos.map( t => <TodoItem key={t.id}  {...t} /> )} 
        </div> 

        <div className="completedHeader" onClick={this.checkCompleted}>
          <span className="text">
            { this.state.showCompleted ? <Icon type="down" />:<Icon type="right" />}
            最近完成的任务
          </span>
        </div>
        
        <div id="completedList" className={completedListClass}>    
          {  this.completedTodos.map( t => <TodoItem key={t.id}  {...t} /> )} 
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state)=>({
  todoItems: state.todos
})





export default connect(mapStateToProps)(TodoList);