import React from 'react';
import { Row, Pagination, Col } from 'react-bootstrap';
import Poll from '../../components/Club/PollView';
import NoData from '../../components/common/NoData';
import Loading from '../../components/common/Loading';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPolls } from '../../actions/club';

class PollListView extends React.Component {
  static propTypes = {
    getPolls: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPolls(this.props.user.profile.club, this.props.page_number);
  }

  setPage(page_number) {
    this.props.getPolls(this.props.user.profile.club, page_number);
  }

  generatePagination() {
    let items = [];
    for (let i = 0; i < this.props.total_polls / 5; i++) {
      items.push(
        <Pagination.Item
          key={'page_item_' + (i + 1)}
          active={this.props.page_number === i}
          onClick={() => this.setPage(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    return (
      <footer>
        <Row>
          <Col lg={{ span: 3, offset: 5 }}>
            <Pagination>{items}</Pagination>
          </Col>
        </Row>
      </footer>
    );
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
          {this.generatePagination()}
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
  poll_list: state.club.poll_list,
  total_polls: state.club.total_polls,
  page_number: state.club.poll_page_number,
});

export default connect(mapStateToProps, { getPolls })(PollListView);
