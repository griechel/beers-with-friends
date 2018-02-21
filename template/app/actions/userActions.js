import * as types from './actionTypes';

export function setUserName(name) {
  return {
    type: types.SET_USER_NAME,
    payload: name,
  };
}

export function storeUser(user) {
    return {
      type: types.STORE_USER,
      payload: user,
    };
  }