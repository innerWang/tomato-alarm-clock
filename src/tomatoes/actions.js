import * as ActionTypes from './actionTypes.js';

export const initTomatoes = (tomatoes = [])=>({
  type: ActionTypes.INIT_TOMATO,
  tomatoes
})


export const addTomato = (tomato={}) =>({
  type: ActionTypes.ADD_TOMATO,
  tomato
})


export const updateTomato = (tomato={})=>({
  type: ActionTypes.UPDATE_TOMATO,
  tomato
})