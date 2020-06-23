import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.id]: e.target.value });

  render() {
    return (
      <div className="col pt-5">
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Label>Login to your account</Form.Label>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter username"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.onSubmit}>
                  Login
                </Button>
                <Form.Text>
                  <a href="/reset_password">Forgot Password</a>
                </Form.Text>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
