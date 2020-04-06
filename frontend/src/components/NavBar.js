import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "shards-react";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">TAMC Library Catalogue</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink active href="/series">
              Series
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="https://www.meetup.com/TriangleAnime/">
              Meetup
            </NavLink>
          </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
          <NavItem>
            <NavLink active href="#">
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;