import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_RESET,
  PASSWORD_RESET_FAIL,
  DELETE_ACCOUNT,
  PROFILE_CHANGE,
  BOOK_HOLD_DELETE_SUCCESS,
  ACCESS_REQUEST_SUCCESS,
  ACCESS_REQUEST_RESPONSE_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case PASSWORD_RESET:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case PROFILE_CHANGE:
    case BOOK_HOLD_DELETE_SUCCESS:
    case ACCESS_REQUEST_SUCCESS:
    case ACCESS_REQUEST_RESPONSE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case PASSWORD_RESET_FAIL:
    case DELETE_ACCOUNT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
