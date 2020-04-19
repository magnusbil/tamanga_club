import React from 'react';
import {Container } from 'shards-react';

class RecentAdditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: this.props.bookList
    }
  }

  render(){
    return(
      <Container>

      </Container>
    );
  }
}

export default RecentAdditions;