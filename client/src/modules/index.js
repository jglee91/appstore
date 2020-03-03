import { combineReducers } from 'redux';
import user from './user';
import company from './company';
import project from './project';
import application from './application';

export default combineReducers({
  user,
  company,
  project,
  application,
});
