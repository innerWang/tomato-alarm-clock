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

  get finishedTomatoes(){
    //console.log(this.props.tomatoes)
    return this.props.tomatoes.filter( t => t.description && t.ended_at && !t.aborted)  
  }

  get dailyTomatoes(){
    const obj= _.groupBy(this.finishedTomatoes,(t)=>{
      return format(new Date(t.ended_at), 'YYYY-MM-DD')
    })
    //console.log(obj)
    return obj
  }

  render(){
    return (
      <div id="dataStatistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>
            <div className="topic">番茄历史</div>
            <div className="graph">
              <div className="text">
                <div>累计完成番茄</div>
                <div>{this.finishedTomatoes.length}</div> 
              </div> 
              <Polygon data={this.dailyTomatoes} totalFinishedCount={this.finishedTomatoes.length}/>
            </div>
          </li>
          <li>
            <div className="topic">任务历史</div>
            <div className="graph">
              <div className="text">
                <div>累计完成任务</div>
                <div>{this.finishedTodos.length}</div> 
              </div> 
              <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
            </div>
          </li>
        </ul>
        <TodoHistory />
      </div>
    )
  }
}

const mapStateToProps =(state)=>{
  return {
    todos:state.todos,
    tomatoes:state.tomatoes
  }
}

export default connect(mapStateToProps)(DataStatistics);