import axios from 'axios';
import { tokenConfig } from './auth';

import { GET_POLLS, VOTE_SUCCESS } from './types';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

export const getPolls = () => (dispatch, getState) => {
  dispatch({ type: GET_POLLS });

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
