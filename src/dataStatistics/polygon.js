/** 
 *  svg 图片大小为 240 * 60
 *  画点时，每一天的记录会对应生成两个点
 *  p1: 为数据对应的前一个点
 *      x1 = x2 -5;
 *      y1 = 前一条记录生成的y  
 *  p2: 为根据数据生成的点，
 *      x2= 240 - 120 /(Date.now() - firstDay ) * ( Date.now() - everyDay);
 *      y2= ( 1 - untilEveryDayFinished / totalFinished) * 60;
*/

import React from 'react';

class Polygon extends React.Component{

  getPoints = ()=>{
    const dates = Object.keys(this.props.data).sort((a,b)=>{
      return Date.parse(a) - Date.parse(b)
    })
   // console.log(this.props.data)
    const firstDay = dates[0];
    if(firstDay){
      const range = Date.parse(new Date()) - Date.parse(firstDay);
      let finishedCount = 0;
      let forePointY = 60 ; //每日的记录有两个点，此点用于存储前一个点的Y坐标
      const pointArr = dates.map(d=>{
        const x = 240 - (Date.parse(new Date()) - Date.parse(d)) * 120 /range;
        finishedCount = finishedCount + this.props.data[d].length;
        const y =  (1- finishedCount /this.props.totalFinishedCount) * 60;
       // console.log(finishedCount,this.props.totalFinishedCount)
        const pointPair =  `${x-5} ${forePointY},${x} ${y}`;
        forePointY = y;
        return pointPair;
      })
      return ['0 60',...pointArr,'240 0','240 60'].join(',');
        
    }else{
      return "0 60,120 60,240 60" 
    }
    
  }

  render(){
    return (
      <div id="polygon">
        <svg >
          <polygon fill="rgba(215,78,78,0.1)" 
                   stroke="rgba(215,78,78,0.5)" 
                   strokeWidth="1" 
                   points={this.getPoints()}
          />
        </svg>
      </div>
    )
  }
}

export default Polygon;