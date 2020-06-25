import React, { Children } from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import PollListView from '../containers/Club/PollListView';
import NoData from '../components/common/NoData';
import reducer from '../reducers/index';
import { PollView } from '../components/Club/PollView';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mountRender = (store, props) => {
  return mount(<PollListView {...props} store={store} />);
};

describe('<PollListView /> unit test with no data', () => {
  let store, props, wrapper;
  beforeEach(() => {
    store = createStore(reducer, {
      // club: {
      //   poll_list: [
      //     {
      //       id: 1,
      //       poll_title: 'poll_title',
      //       choices: [
      //         {
      //           id: 1,
      //           choice_title: 'choice_title',
      //           choice_total_votes: 0,
      //         },
      //       ],
      //     },
      //   ],
      // },
      auth: {
        user: {
          profile: {
            club: 1,
          },
        },
      },
    });
    store.dispatch = jest.fn();
    props = {
      getPolls: jest.fn(),
    };
  });

  it('Should render NoData', () => {
    wrapper = mountRender(store, props);
    // console.log(wrapper.debug());
    expect(wrapper.contains(NoData)).toBe(true);
  });
});
