import React from 'react';
import { 
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Container
} from 'shards-react';

class SeriesDetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: {},
      book_list: [],
    }
  }

  componentDidMount() { 
    if (this.props.location.state.series) {
      fetch("https://www.trianglemanga.club/catalogue/books/" + this.props.location.state.series.id)
      .then(res => res.json())
      .then(book_list => {
        this.setState({
          series: this.props.location.state.series,
          book_list: book_list,
        });
      });
    }
  }

  render(){
    var book_cards  = this.state.book_list.map(function(book){
      console.log(book);
      return (
        <Card style={{ maxWidth: "250px"}}>
          <CardImg src={book.image} />
          <CardBody>
            <CardTitle></CardTitle>
            <p>Vol. {book.number}</p>
          </CardBody>
        </Card>)
      });
    console.log(book_cards);
    return(
      <Container>
        {book_cards}
      </Container>
    );
  }
}

export default SeriesDetailView;