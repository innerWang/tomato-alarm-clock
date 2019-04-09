import React from 'react';
import {connect } from 'react-redux';
import _ from 'lodash';
import {format} from 'date-fns';
import { Tabs } from 'antd';
import TodoItemForHistory from './todoItemForHistory.js';
import classNames from 'classnames';

const TabPane = Tabs.TabPane;

class TodoHistory extends React.Component{
  get finishedTodos(){
    return this.props.todos.filter( t => t.completed && !t.deleted).sort((a,b)=>
      (Date.parse(b.completed_at) -Date.parse(a.completed_at))
    );
  }

  get deletedTodos(){
    return this.props.todos.filter( t => t.deleted).sort((a,b)=>
      (Date.parse(b.updated_at) -Date.parse(a.updated_at))
    );
  }

  get dailyFinishedTodos(){
    //得到按照日期分类的对象
    const obj= _.groupBy(this.finishedTodos,(t)=>{
      return format(new Date(t.completed_at), 'YYYY-MM-DD')
    })
    return obj
  }

  get dailyDeletedTodos(){
    //得到按照日期分类的对象
    const obj= _.groupBy(this.deletedTodos,(t)=>{
      return format(new Date(t.updated_at), 'YYYY-MM-DD')
    })
    return obj
  }

  get finishedDates(){
   // 得到日期对应的数组
    return Object.keys(this.dailyFinishedTodos)
  }

  get deletedDates(){
    return Object.keys(this.dailyDeletedTodos)
  }


  render(){
    let finishedListID = 0;
    let deletedListID = 0;

    const weekday = ['周天','周一','周二','周三','周四','周五','周六']

    const finishedList = (
      <div>
        { this.finishedDates.map( d =>{
          return (
            <div className="finishedDate perdate" key={++finishedListID}>
              <div className="abstract"> 
                <div className="day">
                  <span >{d}</span>
                  <span >{weekday[new Date(d).getDay()]}</span>
                </div>
                <div className="count" >
                  完成了{this.dailyFinishedTodos[d].length}个任务
                </div>
              </div>
              <div className="detailList">
                {this.dailyFinishedTodos[d].map( t => <TodoItemForHistory key={t.id} {...t} type="finished"/>)}
              </div>
            </div>
          )
        })}
      </div>
    )

    const deletedList = (
      <div>
        { this.deletedDates.map( d =>{
          return (
            <div className="deletedDate perdate" key={++deletedListID}>
              <div className="abstract"> 
                <div className="day">
                  <span >{d}</span>
                  <span >{weekday[new Date(d).getDay()]}</span>
                </div>
                <div className="count">
                  刪除了{this.dailyDeletedTodos[d].length}个任务
                </div>
              </div>
              <div className="detailList">
                {this.dailyDeletedTodos[d].map( t => <TodoItemForHistory key={t.id} {...t} type="deleted"/>)}
              </div>
            </div>
          )
        })}
      </div>
    )

    const todoHistoryClass = classNames({
      'todoHistory': true,
      'show':this.props.show
    });

    return (
      <div className={todoHistoryClass} id="todoHistory">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="已完成的任務" key="1">
            {finishedList}
          </TabPane>
          <TabPane tab="已刪除的任務" key="2">
            {deletedList}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    todos: state.todos
  }
}


export default connect(mapStateToProps)(TodoHistory);