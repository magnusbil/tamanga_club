import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { requestAccess } from '../../actions/club';

class SharedAccess extends React.Component {
  static propTypes = {
    requestAccess: PropTypes.func.isRequired,
  };

  /* This code is for a feature and will be added back in later */
  // handleSubmit() {
  //   this.props.requestAccess(this.props.user, this.props.data);
  // }

  /* This code is for a feature and will be added back in later */
  // renderAccessRequest() {
  //   return (
  //     <Container className="pb-5">
  //       <Row>
  //         <Col lg={{ span: 4, order: 2, offset: 4 }}>
  //           <h4>{this.props.data.resource_name}</h4>
  //           <Row>
  //             <Col>
  //               <Button onClick={this.handleSubmit.bind(this)}>
  //                 Request Access
  //               </Button>
  //             </Col>
  //           </Row>
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // }

  renderSharedAccess() {
    return (
      <Container className="pb-5">
        <Row>
          <Col lg={{ span: 4, order: 2, offset: 4 }}>
            <h4>{this.props.data.resource_name}</h4>
            <p>
              username: {this.props.data.username} <br />
              password: {this.props.data.password}
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return this.renderSharedAccess();
    /* This code is for a feature and will be added back in later */
    // return this.props.data.allowed_list &&
    //   this.props.data.allowed_list.includes(this.props.user.id)
    //   ? this.renderSharedAccess()
    //   : this.renderAccessRequest();
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  data: ownProps.data,
});

export default connect(mapStateToProps, { requestAccess })(SharedAccess);
