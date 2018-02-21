import * as types from './actionTypes';

export function setTargetEvent(event) {
  return {
    type: types.SET_TARGET_EVENT,
    payload: event,
  };
}
