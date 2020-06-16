import axios from 'axios';
import { tokenConfig } from './auth';

import { GET_POLLS, VOTE_SUCCESS, GET_SHARED_ACCESS } from './types';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

export const getPolls = () => (dispatch, getState) => {
  axios
    .get('club/polls', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_POLLS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const submitVote = (poll_id, user_id, choice_id) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ poll_id, choice_id, user_id });
  axios
    .post('/club/poll/vote', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: VOTE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSharedAccess = () => (dispatch, getState) => {
  axios.get('/club/shared', tokenConfig(getState)).then((res) => {
    dispatch({
      type: GET_SHARED_ACCESS,
      payload: res.data,
    });
  });
};
