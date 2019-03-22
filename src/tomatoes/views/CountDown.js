import React from 'react';
import { Icon } from 'antd';


const formatTime= (seconds)=>{
  let curMin = ''+Math.floor(seconds/60)
  let curSec = ''+Math.floor(seconds%60)
  curMin = (curMin.length ===1)?('0'+curMin):curMin
  curSec = (curSec.length ===1)?('0'+curSec):curSec
  return (curMin+' : '+curSec)
}


let timerId = null;

class CountDown extends React.Component{

  constructor(props){
    super(props)
    this.state={
      curtime : this.props.originTime,
    }
  }

  get time(){
    return formatTime(this.state.curtime)
  }

  componentWillMount(){
    timerId = setInterval(()=>{
      this.setState({curtime: this.state.curtime-1})
      if( this.state.curtime < 0){
        this.setState({curtime: 0})
        clearInterval(timerId)
        this.props.finish();
      //  document.title = '番茄闹钟';
      }
    },1000)
  }

  componentWillUnmount(){
    clearInterval(timerId)
  }

  componentDidUpdate(){
    //document.title = `${this.time}-番茄闹钟`;
  }

  render(){
    return (
      <div className="countDown">
        {this.time}
        <Icon type="close-circle" className="closeIcon" onClick={this.props.confirm}/>
      </div>
    )
  }
}

export default CountDown;



