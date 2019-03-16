import React, { Component } from 'react';
import {Button,Modal } from 'antd';



class InfoModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible :true
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render(){
    return (
        <Modal
          title="个人信息"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <p>姓名： xxx</p>
          <p>姓名： xxx</p>
          <p>姓名： xxx</p>
        </Modal> 
    )
  }
}

export default InfoModal;