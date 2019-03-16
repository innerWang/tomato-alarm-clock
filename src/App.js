import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import {Provider}  from 'react-redux';
import Home from "./home/home.js";
import Login from "./login/login.js";
import SignUp from "./signup/signup.js";
import history from "./config/history.js";
import store from './Store.js';


class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router history={history}>
          <div>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={SignUp}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
