import { combineReducers } from 'redux';
import user from './userReducer';
import counter from './counterReducer';
import event from './eventReducer';

export default combineReducers({
  counter,
  user,
  event,
});