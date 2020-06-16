import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  get_secret_question,
  validate_answer,
  password_reset,
} from '../../actions/auth';
import { Container, Row, Col, Form } from 'react-bootstrap';

class PasswordReset extends React.Component {
  state = {
    username: undefined,
    new_password: '',
    passwordMatch: '',
    answer: '',
  };

  static propTypes = {
    password_reset: PropTypes.func.isRequired,
  };

  getSecretQuestion() {
    if (this.state.username) {
      this.props.get_secret_question('username');
    }
  }

  validateAnswer() {
    if (this.state.answer) {
      this.props.validate_answer(this.state.answer);
    }
  }

  setPassword() {
    e.preventDefault();

    if (this.state.password != this.state.passwordMatch) {
      this.props.createMessage({ passwordMismatch: 'Passwords do not match' });
    } else {
      this.props.password_reset(this.state.username, this.state.password);
    }
  }

  onChange = (e) => this.setState({ [e.target.id]: e.target.value });

  renderGetUsername() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Label>Enter Username</Form.Label>
              <Form.Group controlId="password">
                <Form.Control
                  type="username"
                  placeholder="Username"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.getSecretQuestion}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  renderGetSecretAnswer() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Label>{this.props.secret_question}</Form.Label>
              <Form.Group controlId="answer">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.validateAnswer}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  renderGetNewPassword() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Label>Enter New Password</Form.Label>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group controlId="passwordMatch">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.setPassword}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return this.state.open_says_me
      ? this.renderGetNewPassword()
      : this.state.username
      ? this.renderGetSecretAnswer()
      : this.renderGetUsername();
  }
}

constMapStateToProps = (state) => ({
  allow_reset: state.allow_reset,
  secret_question: state.secret_question,
});

export default connect(constMapStateToProps, {
  get_secret_question,
  validate_answer,
  password_reset,
})(PasswordReset);
