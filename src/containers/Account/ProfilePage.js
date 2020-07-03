import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Container, Modal, Row, Card } from 'react-bootstrap';
import { removeReservation } from '../../actions/library';

class ProfilePage extends React.Component {
  state = {
    show_modal: false,
    selected_reservation: {
      series_title: '',
    },
  };

  // Toggles the reservation modal
  toggle(book_reservation) {
    this.setState({
      selected_reservation: book_reservation,
      show_modal: !this.state.show_modal,
    });
  }

  reserve = (e) => {
    e.preventDefault();
    this.props.removeReservation(
      this.props.user.id,
      this.state.selected_reservation.id
    );
    this.setState({
      show_modal: false,
    });
  };

  renderAbout() {
    // const interests = this.props.user.profile.interests.map((interest) => {
    //   return <a href={'/search/by_genre/' + interest}>#{interest} </a>;
    // });
    return (
      <div className="pt-2 profile-item-content">
        <h4>About</h4>
        {/* <p>Interests: {interests}</p>  */}
      </div>
    );
  }

  renderBooksOnHold() {
    if (this.props.user.books_on_hold.length > 0) {
      const tiles = this.props.user.books_on_hold.map((book) => {
        return (
          <Card.Img
            src={book.cover_image}
            className="book-img-select profile-detail-book"
            onClick={() => this.toggle(book)}
            key={book.volume_number}
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
        <h4>Books Reserved</h4> <br />
        <h5>
          You have no books on hold. Visit the <a href="/search">library</a> to
          find your next adventure!
        </h5>
      </div>
    );
  }

  render() {
    const { show_modal } = this.state;
    return (
      <Container className="pt-5 profile-group">
        <Row>
          <Col>{this.renderAbout()}</Col>
          <Col>{this.renderBooksOnHold()}</Col>
        </Row>
        <Modal
          centered={true}
          show={show_modal}
          onHide={() => this.toggle.bind(this)}
        >
          <Modal.Header>
            Delete reservation for{' '}
            {this.state.selected_reservation.series_title}{' '}
            {this.state.selected_reservation.volume_number}?
          </Modal.Header>
          <Modal.Body>
            <Button onClick={this.reserve.bind(this)}>Delete</Button>
            <Button
              onClick={() => this.toggle(this.state.selected_reservation)}
            >
              Nevermind
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { removeReservation })(ProfilePage);
