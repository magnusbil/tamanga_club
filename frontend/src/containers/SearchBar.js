import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Form,
  Container,
  Col,
} from "shards-react";

class SearchBar extends React.Component {
  render(){
    return(
      <div class="col pt-5">
          <Container>
            <Row>
              <Col sm={{ size: 8, order: 2, offset: 2}}>
                {/* <InputGroup size="sm" seamless>
                  <InputGroupAddon type="prepend">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroupText>
                  </InputGroupAddon> */}
                  <InputGroup className="mb-2">
                    <InputGroupText>
                      <Nav>
                        <NavItem>
                          <NavLink active href="#">
                            <FontAwesomeIcon icon={faSearch} />
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </InputGroupText>
                    <FormInput placeholder="Search for a book series" />
                  </InputGroup>
                {/* </InputGroup> */}
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

export default SearchBar;