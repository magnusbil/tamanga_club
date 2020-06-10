import React from 'react';
import axios from 'axios';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitVote } from '../../actions/poll';
import Loading from '../common/Loading';

class Poll extends React.Component {
  static propTypes = {
    submitVote: PropTypes.func.isRequired,
  };

  state = {
    selection: {
      id: -1,
    },
  };

  handleChange(choice) {
    this.setState({ selection: choice });
  }

  handleSubmit() {
    this.props.submitVote(
      this.props.poll_data['id'],
      this.props.user['id'],
      this.state.selection['id']
    );
    this.state.selection['choice_total_votes'] += 1;
  }

  calcProgress(count) {
    if (this.props.poll_results.poll_total_votes > 0) {
      var progress = (count / this.props.poll_results.poll_total_votes) * 100;
      return progress.toFixed(2);
    }
    return 0.0;
  }

  renderPoll() {
    const choices = this.props.poll_data.choices.map(function (choice) {
      return (
        <Row key={'choice_' + choice['id']}>
          <Col sm={{ span: 4, order: 2, offset: 4 }}>
            <input
              id={'choice_' + choice['id']}
              type="radio"
              checked={this.state.selection['id'] == choice['id']}
              onChange={() => this.handleChange(choice)}
              value={choice['choice_title']}
            />
            <label className="poll-label">{choice['choice_title']}</label>
          </Col>
        </Row>
      );
    }, this);

    return (
      <div className="col pb-5">
        <Container>
          <Row>
            <Col sm={{ span: 4, order: 2, offset: 4 }}>
              <h3>{this.props.poll_data['poll_title']}</h3>
            </Col>
          </Row>
          <form>{choices}</form>
          <Row>
            <Col sm={{ span: 2, order: 3, offset: 5 }}>
              <Button onClick={this.handleSubmit.bind(this)}>Vote</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  renderResults() {
    var results = this.props.poll_data.choices.map(function (choice) {
      var progress = this.calcProgress(choice['choice_total_votes']);
      return (
        <Row key={'choice_' + choice['id']}>
          <Col sm={{ span: 4, order: 2, offset: 4 }}>
            <p>
              {choice['choice_title']}, {progress}%,{' '}
              {choice['choice_total_votes']} votes
            </p>
            <ProgressBar now={progress} />
          </Col>
        </Row>
      );
    }, this);
    return (
      <div className="col pb-5">
        <Container>
          <Row>
            <Col sm={{ span: 4, order: 2, offset: 4 }}>
              <h3>{this.props.poll_data['poll_title']}</h3>
            </Col>
          </Row>
          {results}
        </Container>
      </div>
    );
  }

  render() {
    var end_date = new Date(this.props.poll_data['poll_end_date']);
    var has_ended = end_date < Date.now();
    var show_result =
      this.props.poll_results && this.props.poll_results.poll_total_votes;

    return this.props.poll_data ? (
      has_ended || show_result ? (
        this.renderResults()
      ) : (
        this.renderPoll()
      )
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state, thisProps) => ({
  user: state.auth.user,
  poll_results: state.poll.poll_results,
  poll_data: thisProps.poll_data,
});

export default connect(mapStateToProps, { submitVote })(Poll);
