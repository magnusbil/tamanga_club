import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../actions/auth';
import { Container } from 'react-bootstrap';

class SettingsPage extends React.Component {
  static propTypes = {
    deleteAccount: PropTypes.func.isRequired,
  };

  render() {
    return <Container></Container>;
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteAccount })(SettingsPage);
