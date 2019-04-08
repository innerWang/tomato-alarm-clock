import React from 'react';
import {connect} from 'react-redux';
import Polygon from './polygon.js'
import './statistics.scss';
import _ from 'lodash';
import {format} from 'date-fns';
import TodoHistory from './todoHistory.js';

class DataStatistics extends React.Component{

  get finishedTodos(){
    return this.props.todos.filter(t=> t.completed && !t.deleted)
  }

  get dailyTodos(){
    const obj= _.groupBy(this.finishedTodos,(t)=>{
      return format(new Date(t.completed_at), 'YYYY-MM-DD')
    })
    return obj
  }

  render(){
    return (
      <div id="dataStatistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成{this.finishedTodos.length}个任务
            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
        <TodoHistory />
      </div>
    )
  }
}

const mapStateToProps =(state)=>{
  return {
    todos:state.todos
  }
}

export default connect(mapStateToProps)(DataStatistics);