import { LOAD_RECENTS, GET_ALL_SERIES, GET_SINGLE_SERIES } from '../actions/types';

const initialState = {
  recent_additions: [],
  series_list: [],
  current_series_data: undefined
}

export default function (state = initialState, action){
  switch(action.type) {
    case LOAD_RECENTS:
      return {
        ...state,
        recent_additions: action.payload
      }
    case GET_ALL_SERIES:
      return{
        ...state,
        series_list: action.payload
      }
    case GET_SINGLE_SERIES:
      return {
        ...state,
        current_series_data: action.payload
      }
    default:
      return state
  }
}