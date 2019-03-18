
import * as ActionTypes from './actionTypes.js';

const reducer = (state=[],action) => {
  switch(action.type){
    case ActionTypes.ADD_TODO: 
      return [action.item,...state];
    case ActionTypes.INIT_TODO:
      return action.items;
    case ActionTypes.MODIFY_TODO:
      return state.map(item => {
        if(action.item.id === item.id){
          return action.item;
        }else{
          return item;
        }
      })
    case ActionTypes.ENABLE_EDIT_TODO: 
      return state.map( item => {
        if(action.id === item.id){
          return {...item,editEnable:true};
        }else{
          return item;
        }
      })
    default: 
      return state;
  }
}

export default reducer;

