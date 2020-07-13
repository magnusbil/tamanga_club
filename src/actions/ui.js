import { SCREEN_RESIZE } from './types';

export const screen_resize = (screen_width) => (dispatch) => {
  const is_mobile = screen_width < 690;

  dispatch({
    type: SCREEN_RESIZE,
    payload: is_mobile,
  });
};
