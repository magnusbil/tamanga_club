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
        <Row className="pt-5">
          <Col lg={{ span: 6, offset: 3 }}>
            <h2>About</h2>
            <p id="home-description">
              Just a fun group of people who love to read manga. We meet every
              other week to read, discuss and share manga.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect()(HomePage);
