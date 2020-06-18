import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/message';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row, Form } from 'react-bootstrap';

const SECURITY_QUESTIONS = [, '', '', ''];

class Register extends React.Component {
  state = {
    register_username: '',
    register_password: '',
    passwordMatch: '',
    security_question: '',
    security_answer: '',
    club_code: '',
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.register_password != this.state.passwordMatch) {
      this.props.createMessage({ passwordMismatch: 'Passwords do not match' });
    } else if (!this.state.club_code) {
      this.props.createMessage({ message: 'Must provide Club Code.' });
    } else {
      this.props.register(
        this.state.register_username,
        this.state.register_password,
        this.state.security_question,
        this.state.security_answer,
        this.state.club_code
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
                  <Form.Label>
                    Username <sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter username"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="register_password">
                  <Form.Label>
                    Password <sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="passwordMatch">
                  <Form.Label>
                    Confirm Password <sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group controlId="security_question">
                  <Form.Label>
                    Security Question <sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Choose a security question."
                    onChange={this.onChange}
                  >
                    <option value="">Choose a security question</option>
                    <option value="What's your favorite anime/manga?">
                      What's your favorite anime/manga?
                    </option>
                    <option value="Who wrote your favorite anime/manga?">
                      Who wrote your favorite anime/manga?
                    </option>
                    <option value="What was your first anime/manga?">
                      What was your first anime/manga?
                    </option>
                    <option value="Who's your waifu/husbando?">
                      Who's your waifu/husbando?
                    </option>
                    <option value="Anime weapon of choice?">
                      Anime weapon of choice?
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="security_answer">
                  <Form.Label>
                    Security Answer <sup>*</sup>
                  </Form.Label>
                  <Form.Control placeholder="Answer" onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="club_code">
                  <Form.Label>
                    Club Code <sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    placeholder="Club code"
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
