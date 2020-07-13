import {
  GET_POLLS,
  VOTE_SUCCESS,
  GET_SHARED_ACCESS,
  GET_THREADS_SUCCESS,
} from '../actions/types';

const initialState = {
  poll_list: [],
  poll_results: [],
  total_polls: 0,
  shared_access_list: undefined,
  total_shared_access: 0,
  thread_list: undefined,
  total_threads: 0,
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
    case GET_THREADS_SUCCESS:
      return {
        ...state,
        thread_list: action.payload.thread_list,
        total_threads: action.payload.total_threads,
      };
    default:
      return state;
  }
}
