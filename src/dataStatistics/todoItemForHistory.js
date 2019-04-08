import React from 'react';
import {connect} from 'react-redux';
import {modifyTodo} from '../todos/actions.js'

class TodoItemForHistory extends React.Component{

  render(){
    const time = new Date(this.props.updated_at);
    const hour = time.getHours();
    const minute = time.getMinutes();
    let action = <span />

    if(this.props.type === 'finished'){
      action = (
        <div className="action">
          <span>恢复</span>
          <span>删除</span>
        </div>
      )
    }else if(this.props.type === 'deleted'){
      action = (
        <div className="action">
          <span>恢复</span>
        </div>
      )
    }

    return (
    <div className="detail">
      <span>{`${hour}:${minute}`}</span>
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