import { GET_POLLS, VOTE_SUCCESS } from '../actions/types';

const initialState = {
  poll_list: [],
  poll_results: [],
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
    default:
      return state;
  }
}
