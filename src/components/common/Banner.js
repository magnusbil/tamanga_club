import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

class Banner extends React.Component {
  render() {
    return (
      <Container className="pb-5">
        <Row>
          <Col lg={{ size: 4, order: 2, offset: 4 }}>
            <h3>{this.props.message}</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Banner;
