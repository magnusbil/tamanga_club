import React from 'react';
import axios from 'axios';
import {
  Button,
  Col,
  Container,
  ProgressBar,
  Row,
} from 'react-bootstrap';

class Poll extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selection: {
        id: -1
      },
      showResult: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPoll = this.renderPoll.bind(this);
    this.renderResults = this.renderResults.bind(this);

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
  }

  handleChange(choice) {
    this.setState({selection: choice});
  }

  handleSubmit() {
    this.setState({loading: true});
    axios.post(process.env.API_BASE_URL + 'club/poll/' + this.props.poll_data['id'] + '/vote/' + this.state.selection['id'])
    .then(res => {
      if(res.status == 200) {
        console.log(res.data);
        this.state.selection['votes'] = res.data['choice_total_votes'];
        this.props.poll_data['poll_total_votes'] = res.data['poll_total_votes']
        this.setState({
          showResult: true
        });
      }
      else {
        console.error(res.data);
      }
    });
    this.setState({loading: false});
  }

  calcProgress(count) {
    if(this.props.poll_data['poll_total_votes'] > 0) {
      var progress = (count / this.props.poll_data['poll_total_votes']) * 100
      return progress.toFixed(2);
    }
    return 0.0;
  }

  renderPoll() {
    const choices = this.props.poll_data.choices.map(function(choice){
      return (
          <Row key={"choice_"+choice['id']}>
            <Col sm={{span: 4, order: 2, offset: 4}}>              
              <input id={"choice_" + choice['id']} type="radio" 
                checked={this.state.selection['id'] == choice['id']} onChange={()=>this.handleChange(choice)} 
                value={choice['choice_title']} />
              <label className="poll-label">{choice['choice_title']}</label>
            </Col>
          </Row>
      );
    }, this);

    return(
      <div className="col pb-5">
        <Container>
          <Row>
            <Col sm={{span: 4, order: 2, offset: 4}}>
              <h3>{this.props.poll_data['poll_title']}</h3>
            </Col>
          </Row>
          <form>
            {choices}
          </form>
          <Row>
            <Col sm={{span: 2, order: 3, offset: 5}}>
              <Button onClick={this.handleSubmit}>
                Vote
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  renderResults() {
    var results = this.props.poll_data.choices.map(function(choice){
      var progress = this.calcProgress(choice['votes']);
      return (
        <Row key={"choice_"+choice['id']}>
          <Col sm={{span: 4, order: 2, offset: 4}}>  
            <p>{choice['choice_title']}, {progress}%, {choice['votes']} votes</p>
            <ProgressBar now={progress} />
          </Col>
        </Row>
      );
    }, this);
    return(
      <div className="col pb-5">
        <Container>
          <Row>
            <Col sm={{span: 4, order: 2, offset: 4}}>
              <h3>{this.props.poll_data['poll_title']}</h3>
            </Col>
          </Row>
          {results}
        </Container>
      </div>
    );
  }

  render(){
    var end_date = new Date(this.props.poll_data['poll_end_date']);
    var has_ended = end_date < Date.now();

    return has_ended || this.state.showResult ?
      this.renderResults()
    :
      this.renderPoll()
  }
}

export default Poll;