import React from 'react';
import { Row } from 'react-bootstrap';
import Poll from '../../components/Club/PollView';
import NoData from '../../components/common/NoData';
import Loading from '../../components/common/Loading';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPolls } from '../../actions/club';
import Paginator from '../../components/common/Paginator';

class PollListView extends React.Component {
  static propTypes = {
    getPolls: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPolls(this.props.user.profile.club, this.props.page_number);
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
      return (
        <div className="pt-5">
          {poll_rows}
          <Paginator
            split_by={5}
            base_url="/polls/page="
            page_number={this.props.page_number}
            total={this.props.total_polls}
          />
        </div>
      );
    } else {
      return <NoData />;
    }
  }

  render() {
    return this.props.poll_list == undefined ? <Loading /> : this.renderPolls();
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  poll_list: state.club.poll_list,
  total_polls: state.club.total_polls,
  page_number: ownProps.match.params.page_number - 1,
});

export default connect(mapStateToProps, { getPolls })(PollListView);
