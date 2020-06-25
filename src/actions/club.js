import axios from 'axios';
import { tokenConfig } from './auth';
import { returnErrors } from './message';

import { GET_POLLS, VOTE_SUCCESS, GET_SHARED_ACCESS } from './types';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

export const getPolls = (club_id) => (dispatch, getState) => {
  axios
    .get('club/polls/' + club_id, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_POLLS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const submitVote = (poll_id, user_id, choice_id) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ poll_id, choice_id, user_id });
  axios
    .post('/club/poll/vote', body, tokenConfig(getState))
    .then((res) => {
      if (res.data.error_message) {
        dispatch(returnErrors(res.data, res.status));
      } else {
        dispatch({
          type: VOTE_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getSharedAccess = (club_id) => (dispatch, getState) => {
  axios.get('/club/shared/' + club_id, tokenConfig(getState)).then((res) => {
    dispatch({
      type: GET_SHARED_ACCESS,
      payload: res.data,
    });
  });
};
