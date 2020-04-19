import React from 'react';
import { Container } from 'shards-react';

class BookDetailView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: {}
    }
  }

  componentDidMount(){
    fetch("https://trianglemanga.club/catalogue/books/" + this.props.match.params.id)
    .then(res =>  res.json())
    .then(book => {
      this.setState({data: book})
    });
  }

  render(){
    return(
      <Container>

      </Container>
    );
  }
}

export default BookDetailView;