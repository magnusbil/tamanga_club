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

  guestNav() {
    return (
      <Navbar id="bg-navbar-pink">
        <Navbar.Brand href="/">TAMC Library club</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://www.meetup.com/TriangleAnime" target="_blank">
            Meetup
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto" id="navbar">
          <Nav.Link href="/login">Sign In</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
  userNav() {
    return (
      <Navbar id="bg-navbar-pink">
        <Navbar.Brand href="/">TAMC Library club</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://www.meetup.com/TriangleAnime" target="_blank">
            Meetup
          </Nav.Link>
          <Nav.Link href="/series">Library</Nav.Link>
          <Nav.Link href="/polls">Polls</Nav.Link>
          <Nav.Link href="/shared">Shared Access</Nav.Link>
        </Nav>
        <Nav className="ml-auto" id="navbar">
          <Nav.Link onClick={this.onSubmit}>Logout</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
  render() {
    return this.props.user ? this.userNav() : this.guestNav();
  }
}

const mapsStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapsStateToProps, { logout })(NavBar);
