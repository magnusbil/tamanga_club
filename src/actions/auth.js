import axios from 'axios';
import { returnErrors } from './message';

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
  GET_SECURITY_QUESTION,
  GET_SECURITY_QUESTION_FAIL,
  VALIDATE_SECURITY_ANSWER,
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  // User Loading
  let token = tokenConfig(getState);
  if (!token.headers.Authorization) {
    dispatch({ type: AUTH_ERROR });
  } else {
    axios
      .get('/club/auth/user', token)
      .then((res) => {
        console.log();
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_ERROR,
        });
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  }
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post('/club/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = { username: username, password: password };
  axios
    .post('/club/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post('/club/auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Retrieve secret question that is associated with the username
export const get_secret_question = (username) => (dispatch, getState) => {
  const body = { username: username };

  axios
    .post('/club/auth/secret_question', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SECURITY_QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_SECURITY_QUESTION_FAIL,
      });
    });
};

// Validate that the answer to the secret question is correct
export const validate_answer = (answer) => (dispatch, getState) => {
  const body = { answer: answer };

  axios
    .post('/club/auth/password_reset', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: VALIDATE_SECURITY_ANSWER,
        payload: res.data,
      });
    });
};

// Reset the user's password with the new password they have entered
export const password_reset = (username, password) => (dispatch, getState) => {
  const body = { username: username, password: password };

  axios
    .post('/club/auth/password_reset', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PASSWORD_RESET,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PASSWORD_RESET_FAIL,
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
