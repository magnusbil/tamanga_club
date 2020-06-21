import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

class ProfilePage extends React.Component {
  renderBookCheckedOut() {
    if (this.props.user.books_checked_out.length > 0) {
      const checked_out_cards = this.props.user.books_on_hold.map((book) => {
        return;
      });
      return checked_out_cards;
    }
    return <h5>You have no books checked out.</h5>;
  }

  renderBooksOnHold() {
    if (this.props.user.books_checked_out.length > 0) {
      const hold_cards = this.props.user.books_on_hold.map((book) => {
        return;
      });
      return hold_cards;
    }
    return (
      <h5>
        You have no books on hold. Visit the <a href="/seach">library</a> to
        find your next adventure!
      </h5>
    );
  }

  rednerDiscussions() {
    return <Container></Container>;
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div>{this.renderBookCheckedOut()}</div>
            <div>{this.renderBooksOnHold()}</div>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(ProfilePage);
