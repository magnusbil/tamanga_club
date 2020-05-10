import React from 'react';
import { 
  Card,
  Container,
  Col,
  Row
} from 'react-bootstrap';

const SeriesRow = (props) => {
  return(
    <Row className="display-row">
      {props.cards}
    </Row>
  );
}

class SeriesListView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      seriesList: []
    }
  }

  componentDidMount(){
    fetch("https://trianglemanga.club/catalogue/series")
    .then(res => res.json())
    .then(seriesList => {
      this.setState({seriesList: seriesList})
    });
  }

  render() {
    if(this.state.seriesList.length !== 0){
      var rows = [];
      var cards = [];
      var series_cards = this.state.seriesList.map(function(series){
      return (
          <a href={"/series/" + series.series_title}>
            <Card className="img-card">
              <Card.Img src={series.series_cover_image} className="book-img"/>
            </Card>
          </a>)
      });
      for (var i=0; i<series_cards.length; i++){
        cards.push(series_cards[i]);
        if(cards.length===4 || i===series_cards.length-1){
          rows.push(<SeriesRow cards={cards}></SeriesRow>);
          cards = [];
        }
      }
      
      return(
        <div className="col pt-5">
          <Container>
              {rows}
          </Container>
        </div>
      );
    }
    else {
      return (
        <Container>
          <Row>
            <Col sm={{ size: 6, order: 2, offset: 3}}>
              <p>No Content Available</p>
            </Col>
          </Row>
        </Container>
        
      );
    }
  }
}

export default SeriesListView;