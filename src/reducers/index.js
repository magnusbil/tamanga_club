import { combineReducers } from "redux"
import auth from './authReducer';
import messages from './messageReducer';
import errors from './errorsReducer';
import poll from './pollReducer';
import library from './libraryReducer';

export default combineReducers({
  auth,
  messages,
  errors,
  poll,
  library,
});