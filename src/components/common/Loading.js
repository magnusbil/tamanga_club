import React from 'react';
import {
  Spinner
} from 'react-bootstrap';

class Loading extends React.Component {
  render(){
    return(
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>)
    ;
  }
}

export default Loading;