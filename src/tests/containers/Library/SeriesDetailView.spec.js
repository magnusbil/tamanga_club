import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SeriesDetailView from '../../../containers/Library/SeriesDetailView';
import { Card, Modal } from 'react-bootstrap';
import Loading from '../../../components/common/Loading';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

const mountRender = (store, props) => {
  return mount(
    <Provider store={store}>
      <Router>
        <SeriesDetailView {...props} />
      </Router>
    </Provider>
  );
};

describe('<SeriesDetailView /> unit test with no data', () => {
  let store, props, wrapper;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {},
      },
      library: {
        current_series_data: undefined,
      },
    });
    props = {
      match: {
        params: { title: 'Testing' },
      },
    };
  });

  it('Should render Loading', () => {
    wrapper = mountRender(store, props);
    expect(wrapper.contains(Loading)).toBe(true);
  });
});

describe('<SeriesDetailView /> unit test with data', () => {
  let store, props, wrapper;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {},
      },
      library: {
        current_series_data: {
          id: 1,
          series_title: 'Testing',
          series_author: 'Test Author',
          series_artist: 'Test Artist',
          series_genres: [],
          series_sub_genres: [],
          complete: false,
          volumes: [
            {
              id: 1,
              series: 1,
              volume_number: 1,
              cover_image: '',
              loaned_to: null,
              hold_for: null,
            },
            {
              id: 2,
              series: 1,
              volume_number: 2,
              cover_image: '',
              loaned_to: null,
              hold_for: 1,
            },
          ],
        },
      },
      series_data: undefined,
    });
    props = {
      match: {
        params: { title: 'Testing' },
      },
    };
  });

  it('Should render img Card', () => {
    wrapper = mountRender(store, props);
    expect(
      wrapper.containsAllMatchingElements([
        <img className="card-img book-img book-img-select" src="" />,
      ])
    ).toBe(true);
    expect(
      wrapper.containsAllMatchingElements([
        <img className="card-img reserved book-img" src="" />,
      ])
    ).toBe(true);
  });
});
