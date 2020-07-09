import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Container, Modal, Row, Card } from 'react-bootstrap';
import { removeReservation } from '../../actions/library';
import { respondToAccessRequest } from '../../actions/club';

class ProfilePage extends React.Component {
  state = {
    show_delete_reservation_modal: false,
    show_handle_request_modal: false,
    selected_reservation: {
      series_title: '',
    },
    selected_request: {},
  };

  static propTypes = {
    removeReservation: PropTypes.func.isRequired,
    respondToAccessRequest: PropTypes.func.isRequired,
  };

  // Toggles the reservation modal
  toggle(book_reservation) {
    this.setState({
      selected_reservation: book_reservation,
      show_modal: !this.state.show_delete_reservation_modal,
    });
  }

  toggleHandleRequest(request) {
    this.setState({
      selected_request: request,
      show_handle_request_modal: !this.state.show_handle_request_modal,
    });
  }

  handleRequest(decision) {
    this.props.respondToAccessRequest(this.state.selected_request, decision);
    this.setState({
      show_handle_request_modal: !this.state.show_handle_request_modal,
    });
  }

  deleteReserve() {
    this.setState({
      show_modal: false,
    });
    this.props.removeReservation(
      this.props.user.id,
      this.state.selected_reservation.id
    );
  }

  renderAbout() {
    const interests = this.props.user.profile.interests.map((interest) => {
      return (
        <a key={interest} href={'/search/by_genre/' + interest}>
          #{interest}{' '}
        </a>
      );
    });
    const noInterests = (
      <p>
        You have no current interests. <br />
        Pick your interests through your{' '}
        <a href="/profile/settings">Account Settings</a>
      </p>
    );
    return (
      <div className="pt-2 profile-item-content">
        <h4>About</h4>
        <h5>Interests:</h5>
        {interests.length > 0 ? interests : noInterests}
      </div>
    );
  }

  renderAccessRequests() {
    const requests = this.props.user.profile.access_requests_received.map(
      (request) => {
        return (
          <div className="access-request">
            <p>
              {request.requesters_name} requested access to{' '}
              {request.account_name}{' '}
            </p>
            <Button onClick={() => this.toggleHandleRequest(request)}>
              Handle Request
            </Button>
          </div>
        );
      }
    );
    return (
      <div className="pt-2 profile-item-content">
        <h4>Access Requests</h4>
        {requests}
      </div>
    );
  }

  renderBooksOnHold() {
    if (this.props.user.profile.books_on_hold.length > 0) {
      const tiles = this.props.user.profile.books_on_hold.map((book) => {
        return (
          <Card.Img
            src={book.cover_image}
            className="book-img-select profile-detail-book"
            onClick={() => this.toggle(book)}
            key={book.series + '_' + book.volume_number}
          />
        );
      });
      return (
        <div className="pt-2 pb-2 profile-item-content">
          <h4>Reserved Books</h4> <br />
          {tiles}
        </div>
      );
    }
    return (
      <div className="pt-2 profile-item-content">
        <h4>Reserved Books</h4>
        <p>
          You have no books on hold.
          <br />
          Visit the <a href="/search">library</a> to find your next adventure!
        </p>
      </div>
    );
  }

  render() {
    const {
      show_delete_reservation_modal,
      show_handle_request_modal,
    } = this.state;
    return (
      <Container className="pt-5 profile-group">
        <Row>
          <Col>{this.renderAbout()}</Col>
          <Col>{this.renderBooksOnHold()}</Col>
        </Row>
        {/* <Row>
          <Col lg={{ span: 4 }}>{this.renderAccessRequests()}</Col>
        </Row> */}
        <Modal
          centered={true}
          show={show_delete_reservation_modal}
          onHide={() => this.toggle.bind(this)}
        >
          <Modal.Header>
            Delete reservation for{' '}
            {this.state.selected_reservation.series_title}{' '}
            {this.state.selected_reservation.volume_number}?
          </Modal.Header>
          <Modal.Body>
            <Button onClick={this.deleteReserve.bind(this)}>Delete</Button>
            <Button
              onClick={() => this.toggle(this.state.selected_reservation)}
            >
              Nevermind
            </Button>
          </Modal.Body>
        </Modal>
        <Modal
          centered={true}
          show={show_handle_request_modal}
          onHide={() => this.toggleHandleRequest.bind(this)}
        >
          <Modal.Header>
            Grant {this.state.selected_request.requesters_name} access to{' '}
            {this.state.selected_request.account_name}?{' '}
            {this.state.selected_reservation.series_title}{' '}
            {this.state.selected_reservation.volume_number}?
          </Modal.Header>
          <Modal.Body>
            <Button onClick={() => this.handleRequest(true)}>Confirm</Button>
            <Button onClick={() => this.handleRequest(false)}>Decline</Button>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  removeReservation,
  respondToAccessRequest,
})(ProfilePage);
