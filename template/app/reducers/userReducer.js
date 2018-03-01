import * as types from '../actions/actionTypes';

const initialState = {
  first_name:'',
  last_name:'',
  name:'',
  uid:'',
  dp:'',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_USER_NAME:
      return {
        ...state,
        name: action.payload
      };
    case types.STORE_USER:
      return {
        ...state,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        uid: action.payload.uid,
        dp: action.payload.dp
      };
    default:
      return state;
  }
}
