import React from 'react';
import { Row } from 'react-bootstrap';
import Poll from '../../components/Club/PollView';
import NoData from '../../components/common/NoData';
import Loading from '../../components/common/Loading';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPolls } from '../../actions/poll';

class PollListView extends React.Component {
  static propTypes = {
    getPolls: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPolls();
  }

  renderPolls() {
    if (this.props.poll_list.length > 0) {
      var poll_rows = this.props.poll_list.map(function (poll) {
        return (
          <Row className="poll" key={poll['poll_title']}>
            <Poll poll_data={poll} />
          </Row>
        );
      });
      return <div className="col pt-5">{poll_rows}</div>;
    } else {
      return <NoData />;
    }
  }

  render() {
    return this.props.poll_list == undefined ? <Loading /> : this.renderPolls();
  }
}

const mapStateToProps = (state) => ({
  poll_list: state.poll.poll_list,
});

export default connect(mapStateToProps, { getPolls })(PollListView);
