import { GET_POLLS, VOTE_SUCCESS, GET_SHARED_ACCESS } from '../actions/types';

const initialState = {
  poll_list: [],
  poll_results: [],
  shared_access: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POLLS: // This case is for PollListView.js
      return {
        ...state,
        poll_list: action.payload,
      };
    case VOTE_SUCCESS: // this case is for Poll.js
      return {
        ...state,
        poll_results: action.payload,
      };
    case GET_SHARED_ACCESS:
      return {
        ...state,
        shared_access: action.payload,
      };
    default:
      return state;
  }
}
