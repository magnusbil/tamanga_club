import { combineReducers } from 'redux';
import auth from './authReducer';
import messages from './messageReducer';
import errors from './errorsReducer';
import club from './clubReducer';
import library from './libraryReducer';

export default combineReducers({
  auth,
  messages,
  errors,
  club,
  library,
});
