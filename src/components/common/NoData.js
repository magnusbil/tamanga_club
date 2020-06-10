import React from 'react';
import {
  Col,
  Container,
  Row
} from 'react-bootstrap';

class NoData extends React.Component {
  render(){
    return(
      <Container>
        <Row>
          <Col sm={{span: 8, order: 2, offset: 2}}>
            <h1 className="text-center">No Content Available</h1>
          </Col>
        </Row>
        
      </Container>
    );
  }
}

export default NoData;