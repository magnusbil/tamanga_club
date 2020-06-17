import axios from 'axios';
import { returnErrors } from './message';
import {
  PASSWORD_RESET,
  PASSWORD_RESET_FAIL,
  GET_SECURITY_QUESTION,
} from './types';

// Retrieve secret question that is associated with the username
export const get_security_question = (username) => (dispatch) => {
  const body = { username: username };
  axios
    .post('/club/auth/security_question', body)
    .then((res) => {
      dispatch({
        type: GET_SECURITY_QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Reset the user's password with the new password they have entered
export const password_reset = (username, answer, password) => (dispatch) => {
  const body = { username: username, answer: answer, password: password };
  axios
    .post('/club/auth/password_reset', body)
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
