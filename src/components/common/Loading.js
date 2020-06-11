import React from 'react';
import { Col, Container, Spinner, Row } from 'react-bootstrap';

class Loading extends React.Component {
  render() {
    return (
      <Container id="loading">
        <Row>
          <Col sm={{ size: 2, order: 1, offset: 5 }}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Loading;
