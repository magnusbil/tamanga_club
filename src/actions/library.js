import axios from 'axios';
import { tokenConfig } from './auth';
import {
  LOAD_RECENTS,
  GET_SINGLE_SERIES,
  GET_ALL_SERIES,
  GET_SINGLE_SERIES_FAIL,
  BOOK_HOLD_DELETE_SUCCESS,
  BOOK_HOLD_REQUEST_SUCCESS,
  GET_GENRE_SERIES,
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
    .catch((err) => {
      dispatch(createMessage({ message: err }));
    });
};

// Get all series for the SeriesDetailView
export const getAllSeries = (page_number) => (dispatch, getState) => {
  axios
    .get('/club/series' + '/' + page_number, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALL_SERIES,
        payload: res.data,
      });
    });
};

export const getGenreSeries = (genre, page_number) => (dispatch, getState) => {
  axios
    .get(
      '/club/series/genre/' + genre + '/' + page_number,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_GENRE_SERIES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(createMessage({ message: err })));
};

// This is used when you go directly to the SeriesDetailView
export const getSingleSeries = (title) => (dispatch, getState) => {
  axios
    .get('/club/series/detail/' + title, tokenConfig(getState))
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

// This is used when you click on a series in the SeriesByTitleView
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
      if (res.data.error_message) {
        dispatch(returnErrors(res.data, res.status));
      } else {
        dispatch(createMessage({ message: res.data.message }));
        dispatch({
          type: BOOK_HOLD_REQUEST_SUCCESS,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const removeReservation = (user_id, book_id) => (dispatch, getState) => {
  const body = {
    user_id: user_id,
    book_id: book_id,
  };

  axios
    .post('/club/reserve/delete', body, tokenConfig(getState))
    .then((res) => {
      if (res.data.error_message) {
        dispatch(returnErrors(res.data, res.status));
      } else {
        dispatch({
          type: BOOK_HOLD_DELETE_SUCCESS,
          payload: res.data.user,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
