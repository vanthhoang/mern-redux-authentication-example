import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  id: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id       // if we want to target a specific error for something, not all errors have an id
      };
    case CLEAR_ERRORS:
      return {
        msg: {},        // set error to default, don't want the old error to hang around our state 
        status: null,
        id: null
      };
    default:
      return state;
  }
}