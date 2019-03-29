import React ,{Component} from 'react';
import {Button, Input,Modal,Icon } from 'antd';
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
      this.updateTomatoDetail({
        description: this.state.description,
        ended_at: new Date()
      })
      this.setState({description:''})
    }
  }

  updateTomatoDetail = (param)=>{
    axios.patch(`tomatoes/${this.props.unfinishedTomato.id}`,param).then((res)=>{
      this.props.updateTomato(res.data.resource)
      console.log(res.data.resource)
    }).catch((e)=>{
      console.log('err')
      throw new Error(e)
    })
  }


  abortTomato =  ()=> {
    this.updateTomatoDetail({aborted: true})
     document.title = '番茄闹钟';
  }

  onFinish = ()=>{
    // 强制更新，重新渲染 ，否则state和props都没改变，不会渲染
    this.forceUpdate()
  }

  showConfirm= ()=> {
    const confirm = Modal.confirm;
    confirm({
      title: '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
      okText: '确定',
      cancelText: '取消',
      onOk:()=> {
        console.log('click ok');
        this.abortTomato();
      },
      onCancel:()=> {
        console.log('click Cancel');
      },
    });
  }

  render(){
    let tpl = <div />
    if(this.props.unfinishedTomato === undefined){
      tpl = <Button className="startClock" onClick={this.props.startTomato}>开始番茄</Button>
    }else{
      const {started_at, duration} = this.props.unfinishedTomato
      const timeNow = new Date().getTime()
      if(timeNow - Date.parse(started_at) > duration) {
        tpl = (
          <div className="inputWrap">
            <Input value={this.state.description}
                 onChange= {e => this.setState({description: e.target.value})}
                 onKeyUp = {this.keyUp}
                 placeholder="你刚刚完成了什么工作？"
                 className="text"
                 />
             <Icon type="close-circle" className="closeIcon" onClick={this.showConfirm}/>
          </div>
          
        )
      }else{
        const time = Math.floor((duration - (timeNow - Date.parse(started_at))) /1000);
        tpl=(
          <CountDown originTime={time}
                     finish={this.onFinish} 
                     confirm={this.showConfirm}
                     duration={duration/1000}
                     />
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