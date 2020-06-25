import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Container, Row, Form, Card } from 'react-bootstrap';

class ProfilePage extends React.Component {
  renderAbout() {
    return (
      <div className="pt-2 profile-item-content">
        <h4>About</h4> <br />
        <p></p>
      </div>
    );
  }

  renderBookCheckedOut() {
    if (this.props.user.books_checked_out.length > 0) {
      const checked_out_cards = this.props.user.books_on_hold.map((book) => {
        return (
          <Card className="img-card">
            <Card.Img src={book.cover_image} className="book-img" />
          </Card>
        );
      });
      return (
        <div className="pt-2 profile-item-content">
          <h4>Books on Loan</h4> <br />
          {checked_out_cards}
        </div>
      );
    }
    return (
      <div className="pt-2 profile-item-content">
        <h4>Books On Loan</h4> <br />
        <h5>You have no books checked out.</h5>
      </div>
    );
  }

  renderBooksOnHold() {
    if (this.props.user.books_on_hold.length > 0) {
      const hold_cards = this.props.user.books_on_hold.map((book) => {
        return (
          <Card className="img-card">
            <Card.Img src={book.cover_image} className="book-img" />
          </Card>
        );
      });
      return (
        <div className="pt-2 profile-item-content">
          <h4>Books Reserved</h4> <br />
          {hold_cards}
        </div>
      );
    }
    return (
      <div className="pt-2 profile-item-content">
        <h4>Books Reserved</h4> <br />
        <h5>
          You have no books on hold. Visit the <a href="/seach">library</a> to
          find your next adventure!
        </h5>
      </div>
    );
  }

  rednerDiscussions() {
    return (
      <Form className="profile-item-content">
        <Form.Group>
          <Form.Control placeholder="Rant, rave, vent, or just say hi ;)" />
        </Form.Group>
        <Button className="ml-auto">Post</Button>
      </Form>
    );
  }
  render() {
    return (
      <Container className="pt-5 profile-group">
        <Row>
          <Col>
            <Row className="profile-item">{this.renderAbout()}</Row>
            <Row className="profile-item">{this.renderBookCheckedOut()}</Row>
            <Row className="profile-item">{this.renderBooksOnHold()}</Row>
          </Col>
          <Col>{this.rednerDiscussions()}</Col>
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
