import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

// import axios from 'axios';
// import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
// //import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';

// export const getItems = () => dispatch => {
//   dispatch(setItemsLoading());   // want to set the loading to true first 
//   axios
//     .get('api/items')
//     .then(res =>
//       dispatch({
//         type: GET_ITEMS,
//         payload: res.data
//       })
//     )
//     // .catch(err =>
//     //   dispatch(returnErrors(err.response.data, err.response.status))
//     // );
// };

// export const addItem = item => (dispatch) => {
//     axios
//       .post('/api/items', item)
//       .then(res =>
//         dispatch({
//           type: ADD_ITEM,
//           payload: res.data
//         })
//       )
//       .catch(err =>
//         dispatch(returnErrors(err.response.data, err.response.status))
//       );
//   };


// export const deleteItem = id => dispatch => {
//   axios
//     .delete(`api/items/${id}`)
//     .then(res =>
//       dispatch({
//         type: DELETE_ITEM,
//         payload: id
//       })
//     )
//     // .catch(err =>
//     //   dispatch(returnErrors(err.response.data, err.response.status))
//     // );
// };

// // export const deleteItem = (id) => {
// //     return {
// //     type: DELETE_ITEM,
// //     payload:id
// //     };
// // };

// // export const addItem = item => {
// //     return {
// //     type: ADD_ITEM,
// //     payload:item
// //     };
// // };

// export const setItemsLoading = () => {
//   return {
//     type: ITEMS_LOADING
//   };
// };

// export const getItems = () => dispatch => {
//   dispatch(setItemsLoading());   // want to set the loading to true first 
//   axios
//     .get('/api/items')
//     .then(res =>
//       dispatch({
//         type: GET_ITEMS
//         //payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };



// export const deleteItem = id => (dispatch, getState) => {
//   axios
//     .delete(`/api/items/${id}`, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: DELETE_ITEM,
//         payload: id
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

// export const setItemsLoading = () => {
//   return {
//     type: ITEMS_LOADING
//   };
// };