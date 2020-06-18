import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

class HomePage extends React.Component {
  render() {
    return (
      <Container className="pt-5">
        <Row>
          <Col lg={{ size: 12 }}>
            <h1 className="text-center" id="home-page-banner">
              Triangle Manga Club
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p></p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect()(HomePage);
