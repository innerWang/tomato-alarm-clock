import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import { Input } from 'antd';
import axios from '../config/axios.js';
import history from '../config/history.js';
import './signup.scss';


class SignUp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userName:'',
      password:'',
      passwordConfirmation:''
    }
  }

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({password: e.target.value });
  }

  onChangePasswordConfirmation = (e) => {
    this.setState({passwordConfirmation: e.target.value });
  }

  submit = async ()=>{
    const { userName,password,passwordConfirmation } = this.state;
    try {
      await axios.post(
        'sign_up/user', 
        {
          account: userName,
          password,
          password_confirmation: passwordConfirmation
        }
      );
      history.push('/');
      console.log('signup success...');
    } catch (error) {
      throw new Error(error);
    }
  }

  componentDidUpdate(){
   // console.log(this.state)
  }

  render() {
    const { userName,password,passwordConfirmation } = this.state;
    return (
      <div id="signUp">
        <h1>番茄闹钟</h1>
        <Input
          placeholder="name"
          value={userName}
          onChange={this.onChangeUserName}
        />
        <Input.Password  
          value={password} placeholder="password" 
          onChange={this.onChangePassword}
        />
        <Input.Password 
          value={passwordConfirmation} placeholder="confirm password" 
          onChange={this.onChangePasswordConfirmation}
        />
        <Button className="signUpBtn" type="primary" onClick = {this.submit}>注册</Button>
        <p>如果你有账号，请立即 <Link to="/login">登录</Link></p>
      </div>
      
    );
  }
}

export default SignUp;


