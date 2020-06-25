import axios from 'axios';
import { tokenConfig } from './auth';
import {
  LOAD_RECENTS,
  GET_SINGLE_SERIES,
  GET_ALL_SERIES,
  GET_SINGLE_SERIES_FAIL,
  HOLD_REQUEST_SUCCESS,
} from './types';
import { createMessage, returnErrors } from './message';

// get recenet library book additions
export const getRecents = () => (dispatch, getState) => {
  axios
    .get('/club/recents', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOAD_RECENTS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(createMessage({ message: err })));
};

// Get all series for the SeriesDetailView
export const getAllSeries = () => (dispatch, getState) => {
  axios.get('/club/series', tokenConfig(getState)).then((res) => {
    dispatch({
      type: GET_ALL_SERIES,
      payload: res.data,
    });
  });
};

// This is used when you go directly to the SeriesDetailView
export const getSingleSeries = (title) => (dispatch, getState) => {
  axios
    .get('/club/series/' + title, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SINGLE_SERIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_SINGLE_SERIES_FAIL,
      });
    });
};

// This is used when you click on a series in the SeriesListView
export const setCurrentSeries = (series_data) => (dispatch) => {
  dispatch({
    type: GET_SINGLE_SERIES,
    payload: series_data,
  });
};

export const reserveBook = (user_id, book_id) => (dispatch, getState) => {
  const body = {
    book_id: book_id,
    user_id: user_id,
  };

  axios
    .post('/club/reserve', body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ message: res.data.message }));
      dispatch({
        type: HOLD_REQUEST_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
