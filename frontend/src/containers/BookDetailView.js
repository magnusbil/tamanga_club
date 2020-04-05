import React from 'react';
import { Container } from 'shards-react';

class BookDetailView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: this.props.data
    }
  }

  render(){
    return(
      <Container>

      </Container>
    );
  }
}

export default BookDetailView;