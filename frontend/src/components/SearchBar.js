import React from "react";
import { Redirect } from 'react-router-dom';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  InputGroup,
  InputGroupText,
  FormInput,
  Container,
  Col,
  Form,
  InputGroupAddon,
  Button,
} from "shards-react";

class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchValue: "",
      redirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event){
    this.setState({searchValue: event.target.value});
  }

  handleSubmit(event){
    if(this.state.searchValue != ""){
      this.setState({redirect: true});
    }
    event.preventDefault()
  }

  render(){
    if(this.state.redirect){
      return <Redirect push to={"/series/" + this.state.searchValue}/>
    }
    return(
      <div className="col pt-5">
          <Container>
            <Row>
              <Col sm={{ size: 8, order: 2, offset: 2}}>
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup seamless className="mb-2">
                      <InputGroupAddon type="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={ faSearch } />
                        </InputGroupText>
                      </InputGroupAddon>
                      <FormInput onChange={this.handleChange} placeholder="Search for a book series" />
                    </InputGroup>
                  </Form>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

export default SearchBar;