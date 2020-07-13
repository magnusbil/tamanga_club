import { SCREEN_RESIZE } from '../actions/types';

const initialState = {
  is_mobile: typeof window == 'object' ? 680 < 690 : null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SCREEN_RESIZE:
      return {
        ...state,
        is_mobile: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
