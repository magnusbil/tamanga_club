import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../../components/Account/Login';
import Register from '../../components/Account/Register';

import { Col, Container, Row } from 'react-bootstrap';

class AuthPage extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect push to={'/'} />;
    }
    return (
      <Container>
        <Row>
          <Col>
            <Login />
          </Col>
          <Col>
            <Register />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AuthPage);
