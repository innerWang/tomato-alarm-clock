import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Checkbox,Input, Icon } from 'antd';
import { modifyTodo,editTodoEnable} from '../actions.js';
import axios from '../../config/axios.js';

class TodoItem extends Component {

  constructor(props){
    super(props)
    this.state = {
      text : this.props.description
    }
  }

  updateTodo = async (param={})=>{
    try{
      const res = await axios.patch(`todos/${this.props.id}`,param);
      this.props.update(Object.assign({},res.data.resource,{editEnable:false}))
    }catch(e){
      throw new Error(e)
    }
  }

  toggle = (e) =>{
    //console.log(e.target.checked)
    this.updateTodo({completed:e.target.checked})
  }

  doubleClickText = ()=>{
    this.props.editTodo(this.props.id)
  }

  clickEnter = ()=>{
    if(this.state.text !== ''){
      // 有数据 更新
      this.updateTodo({description: this.state.text})
    }else{
      // 无数据 删除
      this.updateTodo({deleted: true})
    }
  }

  keyDown = (e)=>{
    if(e.keyCode === 13){
      console.log('press enter....')
      e.preventDefault();
      this.clickEnter();
    }
  }

  deleteItem = ()=>{
    this.updateTodo({deleted: true})
  }

  render(){
    const itemClass = classNames({
      'todoItem': true,
      'editEnable':this.props.editEnable,
      'completed': this.props.completed,
      'deleted': this.props.deleted
    });

    const {TextArea} = Input;
    const TextEdit = (
      <div className="editing">
        <TextArea placeholder="点击回车删除此任务" 
                value={this.state.text} 
                className="inputBox"
                onKeyDown = {this.keyDown}
                onChange={e => this.setState({text: e.target.value})}
                autosize={{ minRows: 1, maxRows: 6 }}
                />
        <div className="iconWrapper">
          <Icon type="enter"  className="enter" onClick={this.clickEnter}/> 
          <Icon type="delete" theme="filled" onClick={this.deleteItem}/>
        </div>
      </div>
    )

    const Text = (
        <div className="text" onDoubleClick= {this.doubleClickText}> {this.state.text} </div>
      );

    return (
      <div id="todoItem" className={itemClass}>
        <Checkbox checked = {this.props.completed} onChange = {this.toggle } className="checkBox"/>
        {this.props.editEnable ? TextEdit : Text }  
      </div>
    )
  }
}

const mapStateToDispatch = (state,ownProps) =>({
  // 组件的props的变化 会引起组件的重新渲染
  ...ownProps
})

const mapDispatchToProps = (dispatch) => {
  return ({
    update: (item) => dispatch(modifyTodo(item)),
    editTodo: (id)=>dispatch(editTodoEnable(id))
  })
}


export default connect(mapStateToDispatch,mapDispatchToProps)(TodoItem);