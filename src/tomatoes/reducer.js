import * as ActionTypes from './actionTypes.js';

const reducer = (state=[],action)=>{
  switch(action.type){
    case ActionTypes.INIT_TOMATO:
      return action.tomatoes;
    case ActionTypes.ADD_TOMATO:
      return [action.tomato,...state];
    case ActionTypes.UPDATE_TOMATO:
      return state.map( t=>{
        if(t.id === action.item.id){
          return action.item;
        }else{
          return t;
        }
      })
    default: return state; 
  }
}

export default reducer;