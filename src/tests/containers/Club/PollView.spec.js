import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Poll from '../../../components/Club/PollView';
import { Container, Row } from 'react-bootstrap';
import Loading from '../../../components/common/Loading';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

const mountRender = (store, props) => {
  return mount(
    <Provider store={store}>
      <Poll {...props} />
    </Provider>
  );
};

describe('<Poll /> unit test with no data', () => {
  let store, props, wrapper;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {},
        token: null,
      },
      club: {
        poll_list: [],
        poll_results: [],
      },
    });
    props = {
      submitVote: jest.fn(),
      poll_data: undefined,
    };
  });

  it('Should render Loading', () => {
    wrapper = mountRender(store, props);
    expect(wrapper.contains(Loading)).toBe(true);
  });
});

describe('<Poll /> unit test with data', () => {
  let store, props, wrapper;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {},
        token: null,
      },
      club: {
        poll_list: [],
        poll_results: [],
      },
    });
    props = {
      submitVote: jest.fn(),
      poll_data: {
        id: 1,
        poll_title: 'Is this a test?',
        poll_start_date: Date.now(),
        poll_end_date: Date.now() + 1,
        choices: [
          {
            id: 1,
            choice_title: 'Yes',
          },
        ],
      },
    };
  });

  it('Should load a poll', () => {
    wrapper = mountRender(store, props);
    expect(
      wrapper.containsAllMatchingElements([
        <label className="poll-label">Yes</label>,
      ])
    ).toBe(true);
  });
});
