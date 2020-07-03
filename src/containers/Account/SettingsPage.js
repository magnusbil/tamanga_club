import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount, updateProfile, saveProfile } from '../../actions/auth';
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

  submitUpdate() {
    this.props.saveProfile(this.props.user);
  }

  securityQuestionChange = (e) =>
    this.setState({ [e.target.id]: e.target.value });

  interestToggle(interest) {
    if (!this.props.user.profile.interests) {
      this.props.user.profile.interests = [interest];
    } else {
      let index = this.props.user.profile.interests.indexOf(interest);
      if (index == -1) {
        this.props.user.profile.interests.push(interest);
      } else {
        this.props.user.profile.intrests = this.props.user.profile.interests.splice(
          index,
          1
        );
      }
    }
    this.props.updateProfile(this.props.user);
  }

  renderSettings() {
    return (
      <Col lg={{ span: 4, order: 2, offset: 4 }}>
        <Form>
          <Form.Label as={'h5'}>Delete Account</Form.Label>
          <Form.Group controlId="security_answer">
            <Form.Label>{this.props.user.profile.security_question}</Form.Label>
            <Form.Control
              placeholder="Answer"
              onChange={this.onChange}
            ></Form.Control>
          </Form.Group>
          <Button onClick={this.submitDelete.bind(this)}>Confirm Delete</Button>
        </Form>
      </Col>
    );
  }

  renderEditProfile() {
    const profile = this.props.user.profile;
    const interest_list = Object.keys(this.props.genre_list).map(
      (key, index) => {
        const classes =
          (profile.interests && profile.interests.includes(key)
            ? 'interest selected '
            : 'interest ') + 'text-center';
        return (
          <p
            key={key}
            className={classes}
            onClick={() => this.interestToggle(key)}
          >
            {this.props.genre_list[key]}
          </p>
        );
      }
    );

    return (
      <Col lg={{ span: 4, order: 2, offset: 4 }}>
        <h5>Edit Interests:</h5>
        {interest_list}
        <div className="pt-3">
          <Button onClick={this.submitUpdate.bind(this)}>Update</Button>
        </div>
      </Col>
    );
  }

  render() {
    return (
      <Container className="pt-5">
        <Row>{this.renderEditProfile()}</Row>
        <Row className="pt-5">{this.renderSettings()}</Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  genre_list: state.library.genre_list,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  createMessage,
  updateProfile,
  saveProfile,
  deleteAccount,
})(SettingsPage);
