import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../actions/auth';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

class SettingsPage extends React.Component {
  state = {
    security_answer: '',
  };

  static propTypes = {
    deleteAccount: PropTypes.func.isRequired,
  };

  submitDelete() {
    if (this.state.security_answer) {
      this.props.deleteAccount(
        this.props.user.username,
        this.state.security_answer
      );
    }
  }

  onChange = (e) => this.setState({ [e.target.id]: [e.target.value] });

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Label>Delete Account</Form.Label>
              <Form.Group controlId="security_answer">
                <Form.Label>
                  {this.props.user.profile.security_answer}
                </Form.Label>
                <Form.Control
                  placeholder="Answer"
                  onChange={this.onChange}
                ></Form.Control>
              </Form.Group>
              <Button onClick={this.submitDelete}></Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteAccount })(SettingsPage);
