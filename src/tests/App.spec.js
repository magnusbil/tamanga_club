import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import App from '../App';
import { Alerts } from '../components/common/Alerts';
import TamcHeader from '../components/common/TamcHeader';
import axios from 'axios';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

const mountRender = (store, props) => {
  return mount(
    <Provider store={store}>
      <App {...props}></App>
    </Provider>
  );
};

const mockLoadUser = jest.fn();
jest.mock('axios');

jest.mock('../actions/auth.js', () => ({
  ...jest.requireActual('../actions/auth.js'),
  loadUser: () => mockLoadUser,
}));

describe('<App/> unit Test', () => {
  let store, props, wrapper;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {},
      },
      errors: {},
      messages: {},
    });
    props = {
      loadUser: mockLoadUser,
    };
  });

  it('Should have an rendered components', () => {
    wrapper = mountRender(store, props);
    expect(
      wrapper.containsAllMatchingElements([
        AlertProvider,
        Alerts,
        <TamcHeader />,
      ])
    ).toBe(true);
  });

  it('Should have called loadUser', () => {
    wrapper = mountRender(store, props);
    expect(mockLoadUser).toHaveBeenCalled();
  });
});
