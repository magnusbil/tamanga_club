import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSharedAccess } from '../../actions/club';
import NoData from '../../components/common/NoData';
import { Container } from 'react-bootstrap';
import SharedAccess from '../../components/Club/SharedAccess';
import Paginator from '../../components/common/Paginator';

class SharedAccessView extends React.Component {
  static propTypes = {
    getSharedAccess: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSharedAccess(
      this.props.user.profile.club,
      this.props.page_number
    );
  }

  setPage(page_number) {
    this.props.getSharedAccess(this.props.user.profile.club, page_number);
  }

  generateRows() {
    if (this.props.shared_access && this.props.shared_access.length > 0) {
      let rows = this.props.shared_access.map((access) => {
        return (
          <SharedAccess
            key={access.resource_name + '_' + access.owner}
            data={access}
          />
        );
      });
      return rows;
    }
    return null;
  }

  render() {
    let access_rows = this.generateRows();
    return access_rows ? (
      <Container className="col pt-5">
        {access_rows}
        <Paginator
          split_by={5}
          setPage={this.setPage.bind(this)}
          page_number={this.props.page_number}
          total={this.props.total_shared_access}
        />
      </Container>
    ) : (
      <NoData />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  shared_access: state.club.shared_access,
  page_number: state.club.shared_access_page_number,
  total_shared_access: state.club.total_shared_access,
});

export default connect(mapStateToProps, { getSharedAccess })(SharedAccessView);
