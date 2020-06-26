import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import NoData from '../components/common/NoData';
import SeriesListView from '../containers/Library/SeriesListView';
import { Card } from 'react-bootstrap';
import Loading from '../components/common/Loading';
import LibraryNav from '../components/Library/LibraryNav';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

const mountRender = (store, props) => {
  return mount(
    <Provider store={store}>
      <SeriesListView {...props} />
    </Provider>
  );
};

describe('<SeriesListView /> in loading phase', () => {
  let store, props, wrapper;
  beforeEach(() => {
    store = mockStore({
      auth: {
        token: null,
      },
      library: {
        series_list: undefined,
      },
    });
    props = {
      getAllSeries: jest.fn(),
      setCurrentSeries: jest.fn(),
    };
  });

  it('Should render Loading', () => {
    wrapper = mountRender(store, props);
    expect(wrapper.containsMatchingElement(Loading)).toBe(true);
  });
});

describe('<SeriesListView /> with no data', () => {
  let store, props, wrapper;
  beforeEach(() => {
    store = mockStore({
      auth: {
        token: null,
      },
      library: {
        series_list: [],
      },
    });
    props = {
      getAllSeries: jest.fn(),
      setCurrentSeries: jest.fn(),
    };
  });

  it('Should render NoData', () => {
    wrapper = mountRender(store, props);
    expect(wrapper.containsMatchingElement(NoData)).toBe(true);
  });
});

describe('<SeriesListView /> with data', () => {
  let store, props, wrapper;
  beforeEach(() => {
    store = mockStore({
      auth: {
        token: null,
      },
      library: {
        series_list: [
          {
            id: 1,
            series_title: 'test series',
            series_author: 'test author',
            series_artist: 'test_artist',
            series_cover_image: '',
            series_genres: '',
            series_sub_genres: '',
            complete: true,
            volumes: [],
          },
        ],
      },
    });
    props = {
      getAllSeries: jest.fn(),
      setCurrentSeries: jest.fn(),
    };
  });

  it('Should render NoData', () => {
    wrapper = mountRender(store, props);
    expect(wrapper.containsMatchingElement(LibraryNav)).toBe(true);
    expect(wrapper.containsMatchingElement(Card)).toBe(true);
  });
});
