import React, { Component } from 'react';
import {Dropdown,Icon,Menu } from 'antd';
import axios from '../config/axios.js';
import history from '../config/history.js';
import './home.scss';
//import InfoModal from '../personalInfo/info.js';
import {Todos} from '../todos/';


const  showModal = () => {
  console.log('show modal...')
  return (
     <div>
       {/* <InfoModal/> */}
     </div>
  )
}

const  logout = ()=>{
  localStorage.setItem('x-token','')
  history.push('/login')
}

const menu = (
  <Menu >
    <Menu.Item key="1" onClick={showModal}><Icon type="user" />个人信息</Menu.Item>
    <Menu.Item key="2" onClick={logout}><Icon type="logout" />注销</Menu.Item>
  </Menu>
);

const ComboBox =(props)=>{
  return (
    <Dropdown overlay={menu}>
      <span style={{ marginLeft: 12 }}>
        {props.name} <Icon type="down" />
      </span>
   </Dropdown>
  )
}
  


class Home extends Component{

  constructor(props){
    super(props)
    this.state = {
      user: {}
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


  render() {
    return (
      <div id="home">
        <header>
          <span className="logo">番茄闹钟</span>
          <ComboBox name= {this.state.user && this.state.user.account}/>
        </header>
        <main>
          <Todos />
        </main>
      </div>
    );
  }
}

export default Home;