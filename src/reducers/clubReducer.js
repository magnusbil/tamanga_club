import { GET_POLLS, VOTE_SUCCESS, GET_SHARED_ACCESS } from '../actions/types';

const initialState = {
  poll_list: [],
  poll_results: [],
  total_polls: 0,
  shared_access: undefined,
  total_shared_access: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POLLS: // This case is for PollListView.js
      return {
        ...state,
        poll_list: action.payload.poll_list,
        total_polls: action.payload.total_polls,
      };
    case VOTE_SUCCESS: // this case is for Poll.js
      return {
        ...state,
        poll_results: action.payload,
      };
    case GET_SHARED_ACCESS:
      return {
        ...state,
        shared_access: action.payload.shared_access_list,
        total_shared_access: action.payload.total_shared_access,
      };
    default:
      return state;
  }
}
