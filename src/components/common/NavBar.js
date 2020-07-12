import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
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
        <Navbar.Brand href="/">Triangle Manga Club</Navbar.Brand>
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
        <Navbar.Brand href="/">Triangle Manga Club</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://www.meetup.com/TriangleAnime" target="_blank">
            Meetup
          </Nav.Link>
          <Nav.Link href="/search">Library</Nav.Link>
          <Nav.Link href="/polls/page=1">Polls</Nav.Link>
          <Nav.Link href="/shared/page=1">Shared Access</Nav.Link>
        </Nav>
        <Nav className="ml-auto pl-2" id="navbar">
          <Nav.Link href="/profile" id="profile-link" className="rounded">
            {
              <span id="profile-icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
            }
            {this.props.user.username}
          </Nav.Link>
          <NavDropdown id="nav-dropdown" alignRight title="">
            <NavDropdown.Item href="/profile/settings">
              Account Settings
            </NavDropdown.Item>
            <NavDropdown.Item onClick={this.onSubmit}>Logout</NavDropdown.Item>
          </NavDropdown>
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
