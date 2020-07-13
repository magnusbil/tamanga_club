import { combineReducers } from 'redux';
import auth from './authReducer';
import club from './clubReducer';
import errors from './errorsReducer';
import library from './libraryReducer';
import messages from './messageReducer';
import password from './passwordReducer';
import ui from './uiReducer';

export default combineReducers({
  auth,
  password,
  messages,
  errors,
  club,
  library,
  ui,
});
