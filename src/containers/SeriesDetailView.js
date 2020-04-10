import React from 'react';
import {
  Button,
  Card,
  CardImg,
  Container,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
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
      current_title: "",
      show_modal: false
    }

    this.toggle = this.toggle.bind(this);
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

  toggle(current_title) {
    this.setState({
      current_title: current_title,
      show_modal: !this.state.show_modal
    });
  }

  render(){
    if(this.state.series.BookList){
      var cards = [];
      var rows = [];
      var book_cards = this.state.series.BookList.map(function(book){
        return (
          <Col sm={{ size: 3, order: 1, offset: 1}}>
            <Card>
              <CardImg src={book.cover_image} className="book-img" onClick={() => this.toggle(this.state.series.series_title)}/>
            </Card>
          </Col>)
        }, this);
      for (var i=0; i<book_cards.length; i++){
        cards.push(book_cards[i]);
        if(cards.length===3 || i===book_cards.length-1){
          rows.push(<BookRow cards={cards}></BookRow>);
          cards = [];
        }
      }
      const { show_modal } = this.state;
      return(
        <div className="coll pt-5">
          <Container>
              {rows}
              <Modal open={show_modal} toggle={() => this.toggle()}>
                <ModalHeader>Reserve {this.state.current_title}?</ModalHeader>
                <ModalBody>
                  <Button>Reserve</Button>
                  <Button onClick={() => this.toggle()}>Cancel</Button>
                </ModalBody>
              </Modal>
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
