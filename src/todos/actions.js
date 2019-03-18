import * as ActionTypes from './actionTypes.js';

export const initTodos = (items)=>({
  type: ActionTypes.INIT_TODO,
  items
})

export const addTodo = (item) => ({
  type: ActionTypes.ADD_TODO,
  item
})

export const toggleTodo = (id)=>({
  type: ActionTypes.TOGGLE_TODO,
  id
})

export const removeTodo = (id)=>({
  type: ActionTypes.REMOVE_TODO,
  id
})

export const  editTodoEnable = (id)=>({
  type: ActionTypes.ENABLE_EDIT_TODO,
  id
})

export const modifyTodo = (item) => ({
  type: ActionTypes.MODIFY_TODO,
  item
})

