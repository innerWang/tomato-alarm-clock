
import * as ActionTypes from './actionTypes.js';

const reducer = (state=[],action) => {
  switch(action.type){
    case ActionTypes.ADD_TODO: 
      return [action.item,...state];
    case ActionTypes.INIT_TODO:
      return action.items;
    case ActionTypes.TOGGLE_TODO:
      return state.map(item => {
        if(action.id === item.id){
          return Object.assign({},item,{completed: !item.completed})
        }else{
          return item;
        }
      })
    default: 
      return state;
  }
}

export default reducer;

