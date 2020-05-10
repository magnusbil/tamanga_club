import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  Nav
} from "react-bootstrap";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_login_modal: false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle(flip){
    if (flip) {
      this.setState({
        show_login_modal: !this.state.show_login_modal
      });
    }
  }

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">TAMC Library Catalogue</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/series">Series</Nav.Link>
          <Nav.Link href="https://www.meetup.com/TriangleAnime" target="_blank">Meetup</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <FontAwesomeIcon icon={faUser} />
        </Nav>
      </Navbar>
      // <Navbar bg="dark" variant="primary">
      //   <Navbar.ComponentBrand href="/">TAMC Library Catalogue</NavbarBrand>
      //   <Nav>
      //     <NavItem>
      //       <NavLink active href="/series">
      //         Series
      //       </NavLink>
      //     </NavItem>
      //     <NavItem>
      //       <NavLink active href="https://www.meetup.com/TriangleAnime/">
      //         Meetup
      //       </NavLink>
      //     </NavItem>
      //   </Nav>
      //   <Nav className="ml-auto">
      //     <NavItem>
      //       <Nav.Link active href="#" id="login" onClick={() => this.toggle(true)}>
      //         <FontAwesomeIcon icon={faUser} />
      //       </Nav.Link>
      //     </NavItem>
      //   </Nav>
      // </Navbar>
    );
  }
}

export default NavBar;