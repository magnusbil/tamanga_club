import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { password_reset } from '../../actions/password';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { createMessage } from '../../actions/message';
import { Redirect } from 'react-router-dom';
import Banner from '../../components/common/Banner';

class PasswordReset extends React.Component {
  state = {
    provided_username: '',
    new_password: '',
    passwordMatch: '',
    security_answer: undefined,
  };

  static propTypes = {
    password_reset: PropTypes.func.isRequired,
  };

  setPassword = (e) => {
    e.preventDefault();
    if (!this.state.security_answer) {
      this.props.createMessage({
        message: 'Must answer security question',
      });
    } else if (this.state.password != this.state.passwordMatch) {
      this.props.createMessage({ passwordMismatch: 'Passwords do not match' });
    } else {
      this.props.password_reset(
        this.props.username,
        this.state.security_answer,
        this.state.password
      );
    }
  };

  onChange = (e) => this.setState({ [e.target.id]: e.target.value });

  render() {
    if (!this.props.security_question) {
      return <Redirect push to="/reset_pwd_get_security" />;
    }
    return (
      <Container className="col pt-5">
        <Banner message={'DO NOT REFRESH PAGE'} />
        <Row>
          <Col lg={{ span: 4, order: 2, offset: 4 }}>
            <Form>
              <Form.Group controlId="security_answer">
                <Form.Label>{this.props.security_question}</Form.Label>
                <Form.Control
                  placeholder="Security Answer"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>New Password</Form.Label>
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
                href="/"
                variant="primary"
                type="submit"
                onClick={this.setPassword.bind(this)}
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
  username: state.password.username,
  security_question: state.password.security_question,
});

export default connect(mapStateToProps, {
  password_reset,
  createMessage,
})(PasswordReset);
