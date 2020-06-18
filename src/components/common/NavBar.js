import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

class NavBar extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  onSubmit = (e) => this.props.logout();

  renderProfileNav() {
    return (
      <Nav className="ml-auto">
        <Nav.Link onClick={this.onSubmit}>
          {/* <FontAwesomeIcon icon={faUser} /> */}
          Logout
        </Nav.Link>
      </Nav>
    );
  }
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">TAMC Library club</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/series">Library</Nav.Link>
          <Nav.Link href="/polls">Polls</Nav.Link>
          <Nav.Link href="/shared">Shared Access</Nav.Link>
          <Nav.Link href="https://www.meetup.com/TriangleAnime" target="_blank">
            Meetup
          </Nav.Link>
        </Nav>
        {this.props.user ? this.renderProfileNav() : <Nav></Nav>}
      </Navbar>
    );
  }
}

const mapsStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapsStateToProps, { logout })(NavBar);
