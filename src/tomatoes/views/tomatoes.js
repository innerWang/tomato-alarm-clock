import React ,{Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../config/axios.js';
import HandleTomato from './handleTomato.js';
import  {initTomatoes,addTomato,updateTomato} from '../actions.js';
import TomatoItem from './tomatoItem.js';

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
    return this.props.tomatoes.filter( t => t.description && t.ended_at);
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
        <div id="tomatoList">
          {this.finishedTomatoes.map( t => <TomatoItem key={t.id} {...t}/> )}
        </div>
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