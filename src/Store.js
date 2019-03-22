import {createStore,combineReducers} from 'redux';

import {reducer as todoReducer} from './todos';
import {reducer as tomatoReducer} from './tomatoes';

const reducers = combineReducers({
  todos: todoReducer,
  tomatoes: tomatoReducer
})

export default createStore(reducers);