import {
  LOAD_RECENTS,
  GET_ALL_SERIES,
  GET_GENRE_SERIES,
  GET_SINGLE_SERIES,
  GET_SINGLE_SERIES_FAIL,
  HOLD_REQUEST_SUCCESS,
} from '../actions/types';

const initialState = {
  recent_additions: [],
  genre: 'action',
  series_list: undefined,
  current_series_data: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_RECENTS:
      return {
        ...state,
        recent_additions: action.payload,
      };
    case GET_ALL_SERIES:
      return {
        ...state,
        series_list: action.payload,
      };
    case GET_GENRE_SERIES:
      return {
        ...state,
        genre: action.payload.genre,
        series_list: action.payload.data,
      };
    case GET_SINGLE_SERIES:
      return {
        ...state,
        current_series_data: action.payload,
      };
    case GET_SINGLE_SERIES_FAIL:
      return {
        ...state,
        current_series_data: [],
      };
    case HOLD_REQUEST_SUCCESS:
    default:
      return state;
  }
}
