import React from 'react';
import {
  Card,
  Carousel,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

class RecentAdditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: []
    }
  }

  componentDidMount() {
    fetch('https://www.trianglemanga.club/catalogue/recents')
    .then(res => res.json())
    .then(bookList => {
      this.setState({
        bookList: bookList
      });
    });
  }

  render(){
    if(this.state.bookList.length > 0){
      var book_cards = this.state.bookList.map(function(book){
        return (
            <a href={"/series/" + book.series_title}>
              <Card className="img-card">
                <Card.Img src={book.cover_image} className="book-img"/>
              </Card>
            </a>)
        }, this);
      return(  
        <div className="col pt-5">
          <h3 class="recents-header">Recent Additions</h3>
          <Container>
            <Carousel>
              <Carousel.Item>
                <Row>
                  {book_cards.slice(0,4)}
                </Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row>
                  {book_cards.slice(4)}
                </Row>
              </Carousel.Item>
            </Carousel>
          </Container>
        </div>
      );
    }
    else{
      return(
        <Container></Container>
      );
    }
  }
}

export default RecentAdditions;