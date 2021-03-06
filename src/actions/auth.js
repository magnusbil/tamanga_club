import axios from 'axios';
import { returnErrors, createMessage } from './message';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DELETE_ACCOUNT,
  PROFILE_CHANGE,
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
      if (res.data.error_message) {
        dispatch(returnErrors(err.response.data, err.response.status));
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = (
  username,
  password,
  security_question,
  security_answer,
  club_code
) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = {
    username: username,
    password: password,
    security_question: security_question,
    security_answer: security_answer,
    club_code: club_code,
  };

  axios
    .post('/club/auth/register', body, config)
    .then((res) => {
      if (res.data.error_message) {
        dispatch(returnErrors(res.data, res.status));
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      }
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

// UPDATE USER PROFILE OBJECT
export const updateProfile = (user) => (dispatch) => {
  dispatch({
    type: PROFILE_CHANGE,
    payload: user,
  });
};

// SAVE USER PROFILE UPDATES TO DATABASE
export const saveProfile = (user) => (dispatch, getState) => {
  const body = {
    user_id: user.id,
    profile: user.profile,
  };

  axios
    .post('/club/auth/user/update/profile', body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ message: res.data.message }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// DELETE USER ACCOUNT
export const deleteAccount = (username, security_answer) => (
  dispatch,
  getState
) => {
  const body = {
    username: username,
    security_answer: security_answer,
  };
  axios
    .post('/club/auth/delete_account', body, tokenConfig(getState))
    .then((res) => {
      if (res.data.error_message) {
        dispatch(returnErrors(res.data, res.status));
      } else {
        dispatch({
          type: DELETE_ACCOUNT,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
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
