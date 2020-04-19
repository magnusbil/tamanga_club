import React from 'react';
import { Container } from 'shards-react';

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

  render(){
    return(
      <Container>

      </Container>
    );
  }
}

export default SeriesListView;