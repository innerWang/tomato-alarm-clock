import React ,{Component} from 'react';
import {Button } from 'antd';
import axios from '../../config/axios.js';
import  './tomatos.scss';

class TomatoClock extends Component{

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
      <div id="tomatos">
        <div className="HandleClock">
          <Button className="clock" onClick={this.startClock}>开始番茄</Button>
        </div>
      </div>
    )
  }
}

export default TomatoClock;