import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import PollListView from '../../../containers/Club/PollListView';
import NoData from '../../../components/common/NoData';
import Poll from '../../../components/Club/PollView';
import Paginator from '../../../components/common/Paginator';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

const mountRender = (store, props) => {
  return mount(
    <Provider store={store}>
      <PollListView {...props} />
    </Provider>
  );
};

describe('<PollListView /> unit test with no data', () => {
  let store, props, wrapper;
  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          profile: {
            club: 1,
          },
        },
      },
      club: {
        poll_list: [],
      },
      ui: {
        card_break_size: 4,
      },
    });
    store.dispatch = jest.fn();
    props = {
      getPolls: jest.fn(),
      match: {
        params: {
          page_number: 1,
        },
      },
    };
  });

  it('Should render NoData', () => {
    wrapper = mountRender(store, props);
    expect(wrapper.containsMatchingElement(NoData)).toBe(true);
  });
});

describe('<PollListView /> unit test with data', () => {
  let store, props, wrapper;
  beforeEach(() => {
    store = mockStore({
      club: {
        poll_list: [
          {
            id: 1,
            poll_title: 'poll_title',
            choices: [
              {
                id: 1,
                choice_title: 'choice_title',
                choice_total_votes: 0,
              },
            ],
          },
        ],
        poll_results: [],
      },
      auth: {
        user: {
          profile: {
            //     club: 1,
            //     poll_votes: [],
          },
        },
      },
      ui: {
        card_break_size: 4,
      },
    });
    store.dispatch = jest.fn();
    props = {
      getPolls: jest.fn(),
      match: {
        params: {
          page_number: 1,
        },
      },
    };
  });

  it('Should render 1 <Poll />', () => {
    wrapper = mountRender(store, props);
    expect(
      wrapper.containsAllMatchingElements([<Poll></Poll>, <Paginator />])
    ).toBe(true);
  });
});
