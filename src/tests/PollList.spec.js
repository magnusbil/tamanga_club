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
let getPollsFunction = require('../actions/poll').getPolls;
getPollsFunction = jest.fn();

const mountRender = (store, props) => {
  return mount(<PollListView {...props} store={store} />);
};

describe('<PollListView /> unit test with no data', () => {
  let store, props, wrapper;
  beforeEach(() => {
    store = createStore(reducer, {});
    store.dispatch = jest.fn();
    props = {
      getPolls: getPollsFunction,
      poll_list: undefined,
    };
  });

  it('Should render NoData', () => {
    wrapper = mountRender(store, props);
    expect(wrapper.contains(NoData)).toBe(true);
  });
});
