import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import SeriesByGenreView from '../../../containers/Library/SeriesByGenreView';
import NoData from '../../../components/common/NoData';
import LibraryNav from '../../../components/Library/LibraryNav';
import { Card } from 'react-bootstrap';
import Paginator from '../../../components/common/Paginator';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

const mountRender = (store, props) => {
  return mount(
    <Provider store={store}>
      <SeriesByGenreView {...props} />
    </Provider>
  );
};
const mockGetGenreSeries = jest.fn();

jest.mock('axios');
jest.mock('../../../actions/library.js', () => ({
  ...jest.requireActual('../../../actions/library.js'),
  getGenreSeries: () => mockGetGenreSeries,
}));

describe('<SeriesByGenre /> unit test with no data', () => {
  let store, props, wrapper;

  beforeEach(() => {
    store = mockStore({
      library: {
        series_list: undefined,
      },
      ui: {
        card_break_size: 4,
      },
    });
    props = {
      getGenreSeries: mockGetGenreSeries,
      match: {
        params: {
          genre: null,
          page_number: 1,
        },
      },
    };
  });

  it('Should call getGenreSeries', () => {
    wrapper = mountRender(store, props);
    expect(mockGetGenreSeries).toHaveBeenCalled();
  });

  it('Should render Nodata', () => {
    wrapper = mountRender(store, props);
    expect(wrapper.contains(NoData));
  });
});

describe('<SeriesByGenre /> unit test with data', () => {
  let store, props, wrapper;

  beforeEach(() => {
    store = mockStore({
      library: {
        series_list: [
          {
            id: 1,
            series_title: 'test series',
            series_author: 'test author',
            series_artist: 'test_artist',
            series_cover_image: '',
            series_genres: '',
            complete: true,
            volumes: [],
          },
        ],
        genre_list: { action: 'Action' },
      },
      ui: {
        card_break_size: 4,
      },
    });
    props = {
      getGenreSeries: mockGetGenreSeries,
      match: {
        params: {
          genre: 'action',
          page_number: 1,
        },
      },
    };
  });

  it('Should call getGenreSeries', () => {
    wrapper = mountRender(store, props);
    expect(mockGetGenreSeries).toHaveBeenCalled();
  });

  it('Should render Nodata', () => {
    wrapper = mountRender(store, props);
    expect(
      wrapper.containsAllMatchingElements([LibraryNav, Card, Paginator])
    ).toBe(true);
  });
});
