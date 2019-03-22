import React ,{useState,useEffect} from 'react';
import { Icon,Modal } from 'antd';
import { timer } from 'rxjs';


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
      visible : false
    }
  }

  componentWillMount(){
    timerId = setInterval(()=>{
      this.setState({curtime: this.state.curtime-1})
      if( this.state.curtime < 0){
        this.setState({curtime: 0})
        clearInterval(timerId)
      }
    },1000)
  }

  componentWillUnmount(){
    clearInterval(timerId)
  }

  clickCloseButton = ()=>{
    console.log('click close..')
    this.setState({visible:true})
  }

  handleCancel = () => {
    this.setState({visible: false});
  }

  handleOK = ()=>{
    console.log('click abort tomato')
    this.setState({visible: false});
    this.props.abort();
  }

  render(){
    const time = formatTime(this.state.curtime)
    return (
      <div className="countDown">
        {time}
        <Icon type="close-circle" className="closeIcon" onClick={this.clickCloseButton}/>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk ={this.handleOK}>
          <p>您目前正在一个番茄工作时间中，要放弃这个番茄吗？</p>
        </Modal> 
      </div>
    )
  }
}

export default CountDown;



