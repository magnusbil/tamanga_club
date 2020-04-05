import React from 'react';
import { Container } from 'shards-react';

class SeriesDetailView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      series: {}
    }
  }

  componentDidMount(){
    fetch("https://trianglemanga.club/catalogue/series/"  + this.props.match.params.title)
    .then(res => res.json())
    .then(series => {
      this.setState({series: series})
    });
  }

  render(){
    return(
      <Container>

      </Container>
    );
  }
}

export default SeriesDetailView;