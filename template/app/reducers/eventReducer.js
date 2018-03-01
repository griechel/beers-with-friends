import * as types from '../actions/actionTypes';

const initialState = {
  id:''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case types.SET_TARGET_EVENT:
        return {
          ...state,
          id: action.payload
        };
    default:
      return state;
  }
}