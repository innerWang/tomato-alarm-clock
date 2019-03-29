import React from 'react';
import {format} from 'date-fns';
//声明一个函数组件
const TomatoDetail = (props)=>{
  return (
    <div className="tomatoDetail">
      <span className="period">{format(new Date(props.started_at), 'HH:mm')}-{format(new Date(props.ended_at), 'HH:mm')} </span>
      <span className="jobDetail">{props.description}</span>
    </div>
  )
}


class TomatoList extends React.Component{

  get dates(){
    const dates = Object.keys(this.props.finishedTomatoes); //返回一个由属性组成的数组
    //将数组中的日期进行降序排序 
    return dates.sort((a,b)=>Date.parse(b)-Date.parse(a))
  }


  render(){
    const list = this.dates.map((date,idx)=>{
      //只取每一天的最后三个tomato
      const tomatoes = this.props.finishedTomatoes[date].slice(0,3);
      return (
        <div className="perDay" key={idx+1}>
          <div className="title">
            <span className="date">{format(date,'M月DD日')}</span>
            <span className="constText">完成了{tomatoes.length}个番茄</span> 
          </div>
          { tomatoes.map(t => <TomatoDetail key={t.id} {...t} />) }
        </div>
      )
    })

    return (
      <div id="tomatoList">
        {list}
      </div>
    )
  }
}


export default TomatoList;