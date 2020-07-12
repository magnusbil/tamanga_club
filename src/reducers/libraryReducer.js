import {
  LOAD_RECENTS,
  GET_ALL_SERIES,
  GET_GENRE_SERIES,
  GET_SINGLE_SERIES,
  GET_SINGLE_SERIES_FAIL,
} from '../actions/types';

const GENRES = {
  action: 'Action',
  comedy: 'Comedy',
  drama: 'Drama',
  horror: 'Horror',
  fantasy: 'Fantasy',
  misc: 'Miscellaneous',
  slice_of_life: 'Slice of Life',
  yoai: 'Yoai',
  yuri: 'Yuri',
  boys_love: 'Boys Love',
  girls_love: 'Girls Love',
  isekai: 'Isekai',
};

const initialState = {
  recent_additions: [],
  genre_list: GENRES,
  series_list: undefined,
  current_series_data: undefined,
  page_number: 0,
  total_series: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_RECENTS:
      return {
        ...state,
        recent_additions: action.payload,
      };
    case GET_ALL_SERIES:
    case GET_GENRE_SERIES:
      console.log(action.payload);
      return {
        ...state,
        series_list: action.payload.series_list,
        page_number: action.payload.page_number,
        total_series: action.payload.total_series,
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
    default:
      return state;
  }
}
