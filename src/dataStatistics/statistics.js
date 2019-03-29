import React from 'react';
import {connect} from 'react-redux';
import './statistics.scss';

class DataStatistics extends React.Component{

  get finishedTodos(){
    return this.props.todos.filter(t=> t.completed && !t.deleted)
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
          </li>
        </ul>
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