import React ,{Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../config/axios.js';
import HandleTomato from './handleTomato.js';
import  {initTomatoes,addTomato,updateTomato} from '../actions.js';
import TomatoList from './tomatoList.js';
import _ from 'lodash';
import {format,addDays} from 'date-fns';

import  './tomatoes.scss';

class TomatoClock extends Component{

  componentDidMount(){
    this.getTomatoList()
  }

  getTomatoList = async ()=>{
    try {
      const res = await axios.get('tomatoes')
      this.props.initTomatoes(res.data.resources)
    } catch (e) {
      throw new Error(e)
    }
  }


  get firstUnFinishedTomato(){
    return  this.props.tomatoes.filter( t => !t.description && !t.ended_at && !t.aborted)[0];
  }

  get finishedTomatoes(){
    const limitTime = Date.parse(addDays(new Date(),-7));
    // 只使用7天内完成的tomatoes
    const finishedTomatoes =  this.props.tomatoes.filter( t => 
      t.description && t.ended_at && !t.aborted && ( Date.parse(t.started_at) > limitTime )
    );
    const obj = _.groupBy(finishedTomatoes,(tomato)=>{
      return format(new Date(tomato.started_at), 'YYYY-MM-DD')
    })
    return obj
  }

  startClock = async ()=>{
    try {
      const res = await axios.post('tomatoes',{duration: 1500000})
      this.props.addTomato(res.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  render(){
    return (
      <div id="tomatoes">
        <HandleTomato unfinishedTomato={this.firstUnFinishedTomato}
                      startTomato={this.startClock}
                      updateTomato={this.props.updateTomato}/>
        <TomatoList finishedTomatoes={this.finishedTomatoes}/>
      </div>
    )
  }
}



const mapStateToProps = (state) =>({
  tomatoes: state.tomatoes
})

const mapDispatchToProps = (dispatch) => {
  return {
    initTomatoes: (tomatoes)=> dispatch(initTomatoes(tomatoes)),
    addTomato: (tomato={}) => dispatch(addTomato(tomato)),
    updateTomato: (tomato={}) => dispatch(updateTomato(tomato)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TomatoClock);