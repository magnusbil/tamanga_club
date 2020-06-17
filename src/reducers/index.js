import { combineReducers } from 'redux';
import auth from './authReducer';
import password from './passwordReducer';
import messages from './messageReducer';
import errors from './errorsReducer';
import club from './clubReducer';
import library from './libraryReducer';

export default combineReducers({
  auth,
  password,
  messages,
  errors,
  club,
  library,
});
