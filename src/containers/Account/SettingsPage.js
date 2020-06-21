import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../actions/auth';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { createMessage } from '../../actions/message';

class SettingsPage extends React.Component {
  state = {
    security_answer: '',
  };

  static propTypes = {
    createMessage: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
  };

  submitDelete() {
    if (this.state.security_answer) {
      this.props.deleteAccount(
        this.props.user.username,
        this.state.security_answer
      );
    } else {
      this.props.createMessage({ message: 'Security answer required.' });
    }
  }

  onChange = (e) => this.setState({ [e.target.id]: [e.target.value] });

  render() {
    return (
      <Container className="pt-5">
        <Row>
          <Col lg={{ span: 4, order: 2, offset: 4 }}>
            <Form>
              <Form.Label>Delete Account</Form.Label>
              <Form.Group controlId="security_answer">
                <Form.Label>
                  {this.props.user.profile.security_question}
                </Form.Label>
                <Form.Control
                  placeholder="Answer"
                  onChange={this.onChange}
                ></Form.Control>
              </Form.Group>
              <Button onClick={this.submitDelete.bind(this)}>
                Confirm Delete
              </Button>
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

export default connect(mapStateToProps, { createMessage, deleteAccount })(
  SettingsPage
);
