import { SCREEN_RESIZE } from '../actions/types';

const window_size = typeof window == 'object' ? window.innerWidth : 0;
const initial_break_size =
  window_size < 768 ? 1 : window_size < 990 ? 2 : window_size < 1200 ? 3 : 4;
const initialState = {
  is_mobile: window_size < 710,
  card_break_size: initial_break_size,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SCREEN_RESIZE:
      return {
        ...state,
        is_mobile: action.payload.is_mobile,
        card_break_size: action.payload.card_break_size,
      };
    default:
      return {
        ...state,
      };
  }
}
