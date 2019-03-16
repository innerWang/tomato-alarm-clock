import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { toggleTodo} from '../actions.js';
import axios from '../../config/axios.js';

class TodoItem extends Component {

  updateTodo = async (param)=>{
    try{
      const res = await axios.patch(`todos/${this.props.id}`,param);
      console.log(res.data)
    }catch(e){
      throw new Error(e)
    }
  }

  render(){
    return (
      <div id="todoItem">
        <Checkbox checked = {this.props.completed}
                  onChange = {this.updateTodo}
        >
        {this.props.description}
        </Checkbox>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    toggleTodos: (id) => dispatch(toggleTodo(id))
  })
}


export default connect(null,mapDispatchToProps)(TodoItem);