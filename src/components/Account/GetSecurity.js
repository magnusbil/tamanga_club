import React from 'react';
import { connect } from 'react-redux';
import { get_security_question } from '../../actions/password';
import { createMessage } from '../../actions/message';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class GetSecurity extends React.Component {
  state = {
    username: '',
  };

  static propTypes = {
    get_security_question: PropTypes.func.isRequired,
  };

  getSecurityQuestion = (e) => {
    e.preventDefault();
    if (this.state.username) {
      this.props.get_security_question(this.state.username);
    } else {
      this.props.createMessage({ message: 'Must provide username.' });
    }
  };

  onChange = (e) => this.setState({ [e.target.id]: e.target.value });

  render() {
    return (
      <Container className="col pt-5">
        <Row>
          <Col lg={{ span: 4, order: 2, offset: 4 }}>
            <Form>
              <Form.Label>Enter Username</Form.Label>
              <Form.Group controlId="username">
                <Form.Control
                  type="username"
                  placeholder="Username"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.getSecurityQuestion.bind(this)}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  security_question: state.password.security_question,
});

export default connect(mapStateToProps, {
  get_security_question,
  createMessage,
})(GetSecurity);
