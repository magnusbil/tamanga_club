import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.message) alert.error(`Error: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username)
        alert.error('Username Error: ' + error.msg.username.join());
      if (error.msg.password)
        alert.error('Password Error: ' + error.msg.password.join());
      if (error.msg.detail) {
        if (error.msg.detail == 'Invalid token.') {
          alert.error('Pleae log back in.');
        } else {
          alert.error(`Error: ${error.msg.detail}`);
        }
      }
      if (error.msg.error_message)
        alert.error(`Error: ${error.msg.error_message}`);
    } else if (message) {
      if (message.state.passwordMismatch) {
        alert.show(message.state.passwordMismatch);
      } else if (message.state.message) {
        alert.show(message.state.message);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
