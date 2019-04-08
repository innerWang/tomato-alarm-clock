import React from 'react';
import {connect} from 'react-redux';
import {modifyTodo} from '../todos/actions.js'
import axios from '../config/axios.js';
import {format} from 'date-fns';

class TodoItemForHistory extends React.Component{

   updateTodo = async (param)=>{
    const ret = await  axios.patch(`todos/${this.props.id}`,param);
 //   console.log(ret.data.resource)
    this.props.update(Object.assign({},ret.data.resource,{editEnable:false}))
  }

  render(){
    let action = <span />

    if(this.props.type === 'finished'){
      action = (
        <div className="action">
          <span onClick={e => this.updateTodo({completed: false})}>恢复</span>
          <span onClick={e => this.updateTodo({deleted: true})}>删除</span>
        </div>
      )
    }else if(this.props.type === 'deleted'){
      action = (
        <div className="action">
          <span onClick={e => this.updateTodo({deleted: false})}>恢复</span>
        </div>
      )
    }
    return (
    <div className="detail">
      <span>{format(new Date(this.props.updated_at),'HH : MM')}</span>
      <span>{this.props.description}</span>
      {action}
    </div>)
  }
}


const mapDispatchToProps = (dispatch)=>{
  return {
    update: item => dispatch(modifyTodo(item))
  }
}

export default connect(null,mapDispatchToProps)(TodoItemForHistory);