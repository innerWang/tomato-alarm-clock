import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Input,Icon} from 'antd';
import  {addTodo} from '../actions.js';
import axios from '../../config/axios.js';


class AddTodo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
  }

  onKeyUp = (e) => {
    // enter
    if(e.keyCode === 13 && this.state.description !== ''){
      this.postAndAdd()
    }
  }

  postAndAdd = async ()=>{
    try{
      const res = await axios.post('todos',{description: this.state.description.trim() })
      this.props.addTodo(Object.assign({},res.data.resource,{editEnable:false}))
      //this.setState({ description: '' })
    }catch(e){
      throw new Error(e)
    }

    this.setState({ description: '' })
  }

  render(){
    const { description } = this.state;
    const suffix = description ? <Icon type="close-circle" onClick={()=>this.setState({description :''})} /> : <span/>;
    return (
      <div id="addtodo">
        <Input
          placeholder="添加新任务"
          suffix={suffix}
          value={description}
          onChange={(e)=>this.setState({ description: e.target.value })}
          onKeyUp = {this.onKeyUp}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    addTodo: (item)=>{
      dispatch(addTodo(item))
    }
  })
}

export default connect(null,mapDispatchToProps)(AddTodo);