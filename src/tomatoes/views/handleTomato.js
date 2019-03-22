import React ,{Component} from 'react';
import {Button, Input } from 'antd';
import axios from '../../config/axios.js';
import CountDown from './CountDown.js';

class HandleTomato extends Component {

  constructor(props){
    super(props)
    this.state = {
      description :''
    }
  }

  keyUp = (e)=>{
    if(e.keyCode === 13 && this.state.description !== ''){
      console.log('submit input context')
      this.addDiscription()
    }
  }

  addDiscription = async ()=>{
    try {
      const res = await axios.patch(`tomatoes/${this.props.unfinishedTomato.id}`,{
        description: this.state.description,
        ended_at: new Date()
      })
      this.setState({description:''})
      this.props.updateTomato(res.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  abortTomato = async ()=> {
    try {
      const res = await axios.patch(`tomatoes/${this.props.unfinishedTomato.id}`,{
        aborted: true
      })
      this.props.updateTomato(res.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  
  // render(){
  //   return (
  //     <div className="handleTomato">
  //       <CountDown originTime={20}/>
  //     </div>
  //   )
  // }

  render(){
    let tpl = <div />
    if(this.props.unfinishedTomato === undefined){
      tpl = <Button className="startClock" onClick={this.props.startTomato}>开始番茄</Button>
    }else{
      const {started_at, duration} = this.props.unfinishedTomato
      const timeNow = new Date().getTime()
      if(timeNow - Date.parse(started_at) > duration) {
        tpl = (
          <Input value={this.state.description}
                 onChange= {e => this.setState({description: e.target.value})}
                 onKeyUp = {this.keyUp}
                 placeholder="你刚刚完成了什么工作？"
                 className="text"
                 />
        )
      }else{
        const time = Math.floor((duration - (timeNow - Date.parse(started_at))) /1000);
        tpl=(
          <CountDown originTime={time} abort={this.abortTomato}/>
        )
      } 
    }

    
    return (
      <div className="handleTomato">
        {tpl}
      </div>
    );
  }

}



export default  HandleTomato;