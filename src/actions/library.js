import axios from 'axios';
import { tokenConfig } from './auth';
import { LOAD_RECENTS, GET_SINGLE_SERIES, GET_ALL_SERIES } from './types';

// get recenet library book additions 
export const getRecents = () => (dispatch, getState) => {
  axios.get('/club/recents', tokenConfig(getState))
  .then(res => {
    dispatch({
      type: LOAD_RECENTS,
      payload: res.data
    });
  })
  .catch(err => {
    console.log(err);
  })
}

// Get all series for the SeriesDetailView
export const getAllSeries = () => (dispatch, getState) => {
  axios.get('/club/series', tokenConfig(getState))
  .then(res => {
    dispatch({
      type: GET_ALL_SERIES,
      payload: res.data
    })
  });
}

// This is used when you go directly to the SeriesDetailView
export const getSingleSeries = (title) => (dispatch, getState) => {
  axios.get('/club/series/' + title, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: GET_SINGLE_SERIES,
      payload: res.data
    })
  });
}

// This is used when you click on a series in the SeriesListView
export const setCurrentSeries = (series_data) => (dispatch) => {
  dispatch({
    type: GET_SINGLE_SERIES,
    payload: series_data
  });
}