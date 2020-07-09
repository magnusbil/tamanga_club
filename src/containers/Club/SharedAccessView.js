import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSharedAccess } from '../../actions/club';
import NoData from '../../components/common/NoData';
import { Container, Row, Col } from 'react-bootstrap';
import SharedAccess from '../../components/Club/SharedAccess';

class SharedAccessView extends React.Component {
  static propTypes = {
    getSharedAccess: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSharedAccess(this.props.user.profile.club);
  }

  generateRows() {
    if (this.props.shared_access && this.props.shared_access.length > 0) {
      let rows = this.props.shared_access.map((access) => {
        return <SharedAccess data={access} />;
      });
      return rows;
    }
    return null;
  }
  render() {
    let access_rows = this.generateRows();
    return access_rows ? (
      <Container className="col pt-5">{access_rows}</Container>
    ) : (
      <NoData />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  shared_access: state.club.shared_access,
});

export default connect(mapStateToProps, { getSharedAccess })(SharedAccessView);
