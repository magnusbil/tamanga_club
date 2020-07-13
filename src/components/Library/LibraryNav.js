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
          <Nav.Link eventKey="by_title" href="/search/by_title/page=1">
            Alphabetical
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="by_genre" href="/search/by_genre/action/page=1">
            Genre
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}

export default LibraryNav;
