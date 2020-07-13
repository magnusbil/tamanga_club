import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NoData from '../../components/common/NoData';
import Paginator from '../../components/common/Paginator';

import { Container } from 'react-bootstrap';

class ForumView extends React.Component {
  componentDidMount() {
    this.props.getThreads(this.props.user.club.id, this.props.page_number);
  }

  renderThreads() {
    thread_rows = this.props.thread_list.map((thread) => {
      return (
        <Row key={thread.title}>
          <h4>{thread.title}</h4>
        </Row>
      );
    });
    return <Row></Row>;
  }
  render() {
    return this.props.thread_list ? (
      <div className="pt-5">
        <Paginator
          split_by={10}
          base_url="/forum/page="
          page_number={this.props.page_number}
          total={this.props.total_threads}
        ></Paginator>
      </div>
    ) : (
      <NoData />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  thread_list: state.club.thread_list,
  total_threads: state.club.total_threads,
  page_number: ownProps.match.params.page_number,
});

export default connect(mapStateToProps, { getThreads })(ForumView);
