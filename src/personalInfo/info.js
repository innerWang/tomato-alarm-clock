import React, { Component } from 'react';
import {Modal } from 'antd';

class InfoModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible :this.props.show
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  componentWillReceiveProps(){
    this.setState({visible:this.props.show})
  }

  render(){
    return (
        <Modal
          title="个人信息"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <p>姓名： {this.props.account}</p>
        </Modal> 
    )
  }
}

export default InfoModal;