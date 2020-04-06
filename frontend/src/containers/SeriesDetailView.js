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
      book_list: []
    }
  }

  componentDidMount() { 
    if (this.props.location.state.series) {
      fetch("https://www.trianglemanga.club/catalogue/books/" + this.props.location.state.series.id)
      .then(res => res.json())
      .then(book_list => {
        this.setState({
          series: this.props.location.state.series,
          book_list: book_list});
      });
    }
  }

  render(){
    // const {book_cards} = this.state.book_list.map(function(book){
    //   return(<Card style={{ maxWidth: "460px" }}>
    //     <CardImg src={book.image} />
    //     <CardBody>
    //       <CardTitle>{this.state.series.title}</CardTitle>
    //       <p>Vol. {book.number}</p>
    //     </CardBody>
    //   </Card>);
    // });

    return(
      <Container>
         {/* {book_cards} */}
      </Container>
    );
  }
}

export default SeriesDetailView;