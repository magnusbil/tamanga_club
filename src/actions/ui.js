import { SCREEN_RESIZE } from './types';

export const screen_resize = (screen_width) => (dispatch) => {
  const is_mobile = screen_width < 690;
  const break_size =
    screen_width < 768
      ? 1
      : screen_width < 990
      ? 2
      : screen_width < 1200
      ? 3
      : 4;
  dispatch({
    type: SCREEN_RESIZE,
    payload: { is_mobile: is_mobile, card_break_size: break_size },
  });
};
