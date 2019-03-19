import React, { Component } from 'react';
import {Dropdown,Icon,Menu } from 'antd';
import axios from '../config/axios.js';
import history from '../config/history.js';
import './home.scss';
import InfoModal from '../personalInfo/info.js';
import {Todos} from '../todos/';
import {TomatoClock} from '../tomatoes/';


class Home extends Component{

  constructor(props){
    super(props)
    this.state = {
      user: {},
      showModal: false
    }
  }

  async componentWillMount(){
    await this.getInfo()
  }

  getInfo = async ()=>{
    try{
      const res = await axios.get('me');
      this.setState({user: res.data})
    }catch(e){
      console.log('已重定向到登录页面...');
    }
  }

  showModal = ()=>{
    this.setState({showModal:true})
  }

  logout = ()=>{
    localStorage.setItem('x-token','')
    history.push('/login')
  }

  render() {
    const menu = (
      <Menu >
        <Menu.Item key="1" onClick={this.showModal}><Icon type="user" />个人信息</Menu.Item>
        <Menu.Item key="2" onClick={this.logout}><Icon type="logout" />注销</Menu.Item>
      </Menu>
    );
    
    const ComboBox = (
      <Dropdown overlay={menu}>
        <span style={{ marginLeft: 12 }}>
          {this.state.user && this.state.user.account} <Icon type="down" />
        </span>
      </Dropdown>
    );

    return (
      <div id="home">
        <header>
          <span className="logo">番茄闹钟</span>
          {ComboBox }
          <InfoModal show={this.state.showModal}/>
        </header>
        <main>
          <TomatoClock/>
          <Todos />
        </main>
      </div>
    );
  }
}

export default Home;