import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { stub } from 'sinon';
import Enzyme, { mount, shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import App from './App';
import loadUser from './actions/auth';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

describe('<App/> unit Test', () => {
  let props, store, wrapper;
  beforeEach(() => {
    store = mockStore({
      auth: {
        user: [],
      },
    });
    props = {
      loadUser: loadUser,
    };

    wrapper = shallow(
      <Provider store={store}>
        <App {...props}></App>
      </Provider>
    );
  });

  it('Should render App', () => {
    expect(wrapper.find(App).length).toBe(1);
  });
});
