import { combineReducers } from 'redux';
import user from './userReducer';
import counter from './counterReducer';

export default combineReducers({
  counter,
  user,
});