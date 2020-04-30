import React from 'react';
import { 
  Card,
  CardImg,
  Container,
  Col,
  Row
} from 'shards-react';

class SeriesDetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: {},
    }
  }

  componentDidMount() { 
    fetch("https://trianglemanga.club/catalogue/series/" + this.props.match.params.title)
    .then(res => res.json())
    .then(data => {
      this.setState({
        series: data,
      });
    });
  }

  render(){
    if(this.state.series.BookList){
      var book_cards = this.state.series.BookList.map(function(book){
        return (
          <Col sm={{ size: 3, order: 2, offset: 2}} >
            <Card>
              <CardImg src={book.cover_image} className="book-img"/>
            </Card>
          </Col>)
        });
      return(
        <div className="coll pt-5">
          <Container>
            <Row> 
              {book_cards}
            </Row>
          </Container>
        </div>
      );
    }
    else {
      return (
        <Container></Container>
      );
    }
  }
}

export default SeriesDetailView;
