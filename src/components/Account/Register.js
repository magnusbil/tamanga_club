import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/message';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row, Form } from 'react-bootstrap';

class Register extends React.Component {
  state = {
    register_username: '',
    register_password: '',
    passwordMatch: '',
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.register_password != this.state.passwordMatch) {
      this.props.createMessage({ passwordMismatch: 'Passwords do not match' });
    } else {
      this.props.register(
        this.state.register_username,
        this.state.register_password
      );
    }
  };

  onChange = (e) => this.setState({ [e.target.id]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect push to={'/'} />;
    }
    return (
      <div className="col pt-5">
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Label>Sign up for an account</Form.Label>
                <Form.Group controlId="register_username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter username"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="register_password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="passwordMatch">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.onSubmit}>
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(null, { register, createMessage })(Register);
