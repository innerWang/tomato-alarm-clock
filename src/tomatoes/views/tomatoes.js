import React ,{Component} from 'react';
import  './tomatoes.scss';
import HandleClock from './handleClock.js';
import ClockList from './clockList.js';

class TomatoClock extends Component{

  render(){
    return (
      <div id="tomatoes">
        <HandleClock />
        <ClockList/>
      </div>
    )
  }
}

export default TomatoClock;