import React ,{Component} from 'react';
//import {Button } from 'antd';
import axios from '../../config/axios.js';

class ClockList extends Component{
  componentDidMount(){
    this.getClockList()
  }

  getClockList = async ()=>{
    try {
      const res = await axios.get('tomatoes')
      console.log(res)
    } catch (e) {
      throw new Error(e)
    }
  }

  render(){
    return (
      <div id="clockList">

      </div>
    );
  }
}

export default ClockList;