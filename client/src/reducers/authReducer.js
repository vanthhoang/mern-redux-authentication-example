import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),  // fetching token from localStorage
    isAuthenticated: null,
    isLoading: false,       //false by default
    user: null              // null by default 
  };
  
  export default function(state = initialState, action) {
    switch (action.type) { // evaluate the action.type
      case USER_LOADING:    // the point where we try to get the user from the backend to where we actually fetch the user 
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:     // is run all the time w every request to see if the user is logged in or not 
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);  //setting it to localstorage
        return {
          ...state,
          ...action.payload,   // have user and token 
          isAuthenticated: true,
          isLoading: false
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,  // clear out the token 
          user: null,
          isAuthenticated: false,
          isLoading: false
        };
      default:
        return state;
    }
  }