import React from 'react';
import axios from 'axios';
import Book from '../components/Book';

class BookDetailView extends React.Component {
  state = {
    book: {}
  }

  componentDidMount(){
    const bookID = this.props.match.params.bookID;
    axios.get(`https://www.trianglemanga.club/catalogue/books/${bookID}`)
    .then(res => {
      this.setState({
        book : res.data
      });
    })
  }

  render() {
    return (
      <Book data={this.state.book}/>
    );
  }
}

export default BookDetailView;