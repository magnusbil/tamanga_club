import { GET_SECURITY_QUESTION } from '../actions/types';

const initialState = {
  username: undefined,
  security_question: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SECURITY_QUESTION:
      return {
        ...state,
        username: action.payload.username,
        security_question: action.payload.question,
      };
    default:
      return state;
  }
}
