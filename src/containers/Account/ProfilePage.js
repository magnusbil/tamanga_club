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

  renderBooksOnHold() {
    if (this.props.user.books_on_hold.length > 0) {
      const tiles = this.props.user.books_on_hold.map((book) => {
        return (
          <Card.Img src={book.cover_image} className="book-img-profile-small" />
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
            {/* <Row className="profile-item">{this.renderBookCheckedOut()}</Row> */}
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
