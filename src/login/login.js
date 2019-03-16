import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import { Input } from 'antd';
import axios from '../config/axios';
import history from '../config/history';

import './login.scss';


class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      userName:'',
      password:'',
    }
  }
  
  onChange = (key,value) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
    
  }

  componentDidUpdate(){
    //console.log(this.state)
  }


  submit = async ()=>{
    const { userName,password } = this.state;
    try {
      await axios.post(
        'sign_in/user', 
        {
          account: userName,
          password
        }
      );
      
      console.log('login success....')
      history.push('/')
    } catch (error) {
      throw new Error(error)
    }
  }


  render() {
    const { userName,password } = this.state;
    return (
      <div id="login">
        <h1>番茄闹钟</h1>
        <Input
          placeholder="name"
          value={userName}
          onChange={(e)=>{this.onChange('userName',e.target.value)}}
        />
        <Input.Password  
          value={password} placeholder="password" 
          onChange={(e)=>{this.onChange('password',e.target.value)}}
        />

        <Button className="LoginBtn" type="primary" onClick = {this.submit}>登录</Button>
        <p><Link to="/signup">创建一个账号</Link></p>
      </div>
      
    );
  }
}

export default Login;