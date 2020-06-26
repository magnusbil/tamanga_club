import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import App from './App';
import { Alerts } from './components/common/Alerts';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

const mountRender = (store, props) => {
  return mount(
    <Provider store={store}>
      <App {...props}></App>
    </Provider>
  );
};

describe('<App/> unit Test', () => {
  let props, store, wrapper;
  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {},
      },
      errors: {},
      messages: {},
    });
    props = {
      loadUser: jest.fn(),
    };
  });

  it('Should have an Alerter components', () => {
    wrapper = mountRender(store, props);
    expect(wrapper.containsMatchingElement(AlertProvider)).toBe(true);
    expect(wrapper.containsMatchingElement(Alerts));
  });
});
