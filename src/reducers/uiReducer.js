import { SCREEN_RESIZE } from '../actions/types';

const window_size = typeof window == 'object' ? window.innerWidth : 0;
const initialState = {
  is_mobile: window < 690,
  card_break_size: typeof window == 'object' ? window.innerWidth < 1200 : null,
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
