import React from 'react';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

class TamcHeader extends React.Component {
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

  largeNav() {
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

  smallNav() {
    return (
      <Navbar id="bg-navbar-pink">
        <Navbar.Brand href="/">Triangle Manga Club</Navbar.Brand>
        <Nav className="ml-auto">
          <NavDropdown
            id="nav-dropdown"
            alignRight
            title={
              <span>
                <FontAwesomeIcon icon={faBars} />
              </span>
            }
          >
            <NavDropdown.Item
              href="https://www.meetup.com/TriangleAnime"
              target="_blank"
            >
              Meetup
            </NavDropdown.Item>
            <NavDropdown.Item href="/search">Library</NavDropdown.Item>
            <NavDropdown.Item href="/polls/page=1">Polls</NavDropdown.Item>
            <NavDropdown.Item href="/shared/page=1">
              Shared Access
            </NavDropdown.Item>
            <NavDropdown.Item href="/profile">
              {
                <span id="profile-icon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              }
              {this.props.user.username}
            </NavDropdown.Item>
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
    return this.props.user
      ? this.props.is_mobile
        ? this.smallNav()
        : this.largeNav()
      : this.guestNav();
  }
}

const mapsStateToProps = (state) => ({
  user: state.auth.user,
  is_mobile: state.ui.is_mobile,
});

export default connect(mapsStateToProps, { logout })(TamcHeader);
