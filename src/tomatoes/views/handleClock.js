import React ,{Component} from 'react';
import {Button } from 'antd';
import axios from '../../config/axios.js';

class HandleClock extends Component {

  startClock = async ()=>{
    try {
      const res = await axios.post('tomatoes',{duration: 1500000})
      console.log(res)
    } catch (e) {
      throw new Error(e)
    }
  }

  render(){
    return (
      <div className="HandleClock">
        <Button className="clock" onClick={this.startClock}>开始番茄</Button>
      </div>
    );
  }
}

export default  HandleClock; 