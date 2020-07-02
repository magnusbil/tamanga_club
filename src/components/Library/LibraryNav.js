import React from 'react';
import { Nav } from 'react-bootstrap';

class LibraryNav extends React.Component {
  render() {
    return (
      <Nav variant="tabs" defaultActiveKey={this.props.currentLink}>
        <Nav.Item>
          <Nav.Link eventKey="search" href="/search">
            Search
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="by_title" href="/search/by_title">
            Alphabetical
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="genre" href="/search/by_genre/action">
            Genre
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default LibraryNav;
