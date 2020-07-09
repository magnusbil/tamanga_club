import axios from 'axios';
import { tokenConfig } from './auth';
import { returnErrors, createMessage } from './message';

import {
  GET_POLLS,
  VOTE_SUCCESS,
  GET_SHARED_ACCESS,
  ACCESS_REQUEST_SUCCESS,
  ACCESS_REQUEST_RESPONSE_SUCCESS,
} from './types';

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
          payload: res.data.user,
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

export const requestAccess = (user, shared_access) => (dispatch, getState) => {
  const body = {
    requester_id: user.id,
    owner_id: shared_access.owner,
    shared_access_id: shared_access.id,
  };

  console.log(body);
  axios
    .post('/club/request_shared_access', body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ message: res.data.message }));
      if (res.status == 201) {
        dispatch({
          type: ACCESS_REQUEST_SUCCESS,
          payload: res.data.user,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const respondToAccessRequest = (request, decision) => (
  dispatch,
  getState
) => {
  const body = {
    decision: decision,
    access_request_id: request.id,
  };
  axios
    .post('/club/access_request_respond', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACCESS_REQUEST_RESPONSE_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
