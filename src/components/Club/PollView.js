import React from 'react';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitVote } from '../../actions/club';
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
    if (this.state.selection) {
      this.props.submitVote(
        this.props.poll_data.id,
        this.props.user.id,
        this.state.selection.id
      );
    }
  }

  calcProgress(count) {
    var progress;
    if (
      this.props.poll_results &&
      this.props.poll_results.poll_total_votes > 0
    ) {
      progress = (count / this.props.poll_results.poll_total_votes) * 100;
      return progress.toFixed(2);
    } else {
      if (this.props.poll_data.poll_total_votes > 0) {
        progress = (count / this.props.poll_data.poll_total_votes) * 100;
        return progress.toFixed(2);
      }
      return 0.0;
    }
  }

  showResults() {
    var end_date = new Date(this.props.poll_data.poll_end_date);
    if (end_date < Date.Now || this.props.poll_results.poll_total_votes) {
      return true;
    } else {
      let vote_list = this.props.user.poll_votes;
      for (var vote in vote_list) {
        if (vote_list[vote].poll == this.props.poll_data.id) {
          return true;
        }
      }
    }
    return false;
  }

  renderPoll() {
    const choices = this.props.poll_data.choices.map(function (choice) {
      return (
        <Row key={'choice_' + choice.id}>
          <Col lg={{ span: 4, order: 2, offset: 4 }}>
            <input
              id={'choice_' + choice.id}
              type="radio"
              checked={this.state.selection.id == choice.id}
              onChange={() => this.handleChange(choice)}
              value={choice.choice_title}
            />
            <label className="poll-label">{choice.choice_title}</label>
          </Col>
        </Row>
      );
    }, this);

    return (
      <div className="col pb-5">
        <Container>
          <Row>
            <Col lg={{ span: 4, order: 2, offset: 4 }}>
              <h3>{this.props.poll_data.poll_title}</h3>
            </Col>
          </Row>
          <form>{choices}</form>
          <Row>
            <Col lg={{ span: 2, order: 3, offset: 5 }}>
              <Button onClick={this.handleSubmit.bind(this)}>Vote</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  renderResults() {
    if (this.state.selection) {
      this.state.selection.choice_total_votes =
        this.props.poll_results.choice_total_votes != undefined
          ? this.props.poll_results.choice_total_votes
          : 0;
    }

    var results = this.props.poll_data.choices.map(function (choice) {
      var progress = this.calcProgress(choice.choice_total_votes);
      return (
        <Row key={'choice_' + choice.id}>
          <Col lg={{ span: 4, order: 2, offset: 4 }}>
            <p>
              {choice.choice_title}, {progress}%, {choice.choice_total_votes}{' '}
              votes
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
            <Col lg={{ span: 4, order: 2, offset: 4 }}>
              <h3>{this.props.poll_data.poll_title}</h3>
            </Col>
          </Row>
          {results}
        </Container>
      </div>
    );
  }

  render() {
    return this.props.poll_data ? (
      this.showResults() ? (
        this.renderResults()
      ) : (
        this.renderPoll()
      )
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  poll_results: state.club.poll_results,
  poll_data: ownProps.poll_data,
});

export default connect(mapStateToProps, { submitVote })(Poll);
