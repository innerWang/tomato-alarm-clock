import React, { Component } from 'react';

export const TomatoItem  = (props)=>{

  const {description,started_at,ended_at} = props;

  const endTime = new Date(ended_at);
  const startTime = new Date(started_at);
  const month = endTime.getMonth()+1;
  const date = endTime.getDate();
  const endHour = endTime.getHours();
  const endMin  = endTime.getMinutes() < 10 ? '0'+endTime.getMinutes():endTime.getMinutes();
  const startHour = startTime.getHours();
  const startMin = startTime.getMinutes() <10 ? '0'+startTime.getMinutes():startTime.getMinutes();

  return (
    <div className="tomatoItem">
      <div className="tomatoItemHeader">
        <div> {`${month}月${date}日`}</div>
        <div className="constText"> 完成1个番茄</div>
      </div>
      <div className="tomatoItemDetail">
        <div className="period">{`${startHour}:${startMin} - ${endHour}:${endMin}`}</div>
        <div className="jobDetail">{description}</div>
      </div>
    </div>
  )

}

export default TomatoItem;

