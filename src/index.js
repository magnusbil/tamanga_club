import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { screen_resize } from './actions/ui';

window.addEventListener('resize', () => {
  store.dispatch(screen_resize(window.innerWidth));
});

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
);
