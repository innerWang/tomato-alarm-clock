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

  componentDidMount(){
    timerId = setInterval(()=>{
      this.setState({curtime: this.state.curtime-1});
      document.title = `${this.time}-番茄闹钟`;
      if( this.state.curtime < 0){
        this.setState({curtime: 0})
        clearInterval(timerId)
        this.props.finish();
        document.title = '番茄闹钟';
      }
    },1000)
  }

  componentWillUnmount(){
    clearInterval(timerId)
    console.log('clear timer.....')
  }

  render(){
    const percent = (this.state.curtime/this.props.duration*100)+'%' ;
    return (
      <div className="countDown">
        <div className="timeText">{this.time}</div>
        <div className="progress" style={{right: percent}}></div>
        <Icon type="close-circle" className="closeIcon" onClick={this.props.confirm}/>
      </div>
    )
  }
}

export default CountDown;



