import React from 'react';
import { 
  Card,
  CardImg,
  Container,
  Col,
  Row
} from 'shards-react';

const BookRow = (props) => {
  return(
    <Row className="display-row">
      {props.cards}
    </Row>
  );
}

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
      var cards = [];
      var rows = [];
      var book_cards = this.state.series.BookList.map(function(book){
        return (
          <Col sm={{ size: 3, order: 1, offset: 1}} >
            <Card>
              <CardImg src={book.cover_image} className="book-img"/>
            </Card>
          </Col>)
        });
      for (var i=0; i<book_cards.length; i++){
        cards.push(book_cards[i]);
        if(cards.length===3 || i===book_cards.length-1){
          rows.push(<BookRow cards={cards}></BookRow>);
          cards = [];
        }
      }
      return(
        <div className="coll pt-5">
          <Container>
              {rows}
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
