import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING
  } from '../actions/types';
  
  const initialState = {
    items: [],
    loading: false     
    // when we fetch data, it could take a couple milliseconds to get and this will be set to false but once we start 
    // to get the data w the request we want this set to true and when we get the data back we want to set back to false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ITEMS:
        return {
          ...state,
          items: action.payload,
          loading: false
        };
      case DELETE_ITEM:
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload)  // action.load gives whatever the id the user passes in
        };
      case ADD_ITEM:
        return {
          ...state,   // want current state 
          items: [action.payload, ...state.items]  // add new item to the current state, can't directly change it have to make a copy and add in 
        };
      case ITEMS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
