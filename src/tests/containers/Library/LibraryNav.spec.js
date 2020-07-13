import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LibraryNav from '../../../components/Library/LibraryNav';
import { Nav } from 'react-bootstrap';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const mockStore = configureMockStore([thunk]);

const mountRender = (props) => {
  return mount(<LibraryNav {...props} />);
};

describe('<LibraryNav', () => {
  let wrapper;

  it('Should ', () => {
    wrapper = mountRender('/search');
    expect(
      wrapper.containsAllMatchingElements([
        <Nav.Link eventKey="search" href="/search">
          Search
        </Nav.Link>,
        <Nav.Link eventKey="by_title" href="/search/by_title/page=1">
          Alphabetical
        </Nav.Link>,
        <Nav.Link eventKey="by_genre" href="/search/by_genre/action/page=1">
          Genre
        </Nav.Link>,
      ])
    ).toBe(true);
  });
});
