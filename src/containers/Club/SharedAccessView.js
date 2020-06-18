import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSharedAccess } from '../../actions/club';
import NoData from '../../components/common/NoData';
import { Container, Row, Col } from 'react-bootstrap';

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
        return (
          <Container className="pb-5">
            <Row>
              <Col lg={{ span: 4, order: 2, offset: 4 }}>
                <h4>{access.resource_name}</h4>
                <p>
                  username: {access.username} <br />
                  password: {access.password}
                </p>
              </Col>
            </Row>
          </Container>
        );
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
