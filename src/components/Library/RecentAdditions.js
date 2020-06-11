import React from 'react';
import { Card, Carousel, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecents } from '../../actions/library';

class RecentAdditions extends React.Component {
  static propTypes = {
    getRecents: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getRecents();
  }

  render() {
    if (this.props.recent_additions.length > 0) {
      var book_cards = this.props.recent_additions.map(function (book) {
        return (
          <a href={'/series/' + book.series_title} key={book.volume}>
            <Card className="img-card">
              <Card.Img src={book.cover_image} className="book-img" />
            </Card>
          </a>
        );
      }, this);

      return (
        <div className="col p-5">
          <h3 className="text-center">Recent Additions</h3>
          <Container controls={false}>
            <Carousel>
              {/* for right now these values are static because I know the data is there.
              I plan to make this dynamic after the poc is done */}
              <Carousel.Item>
                <Row>{book_cards.slice(0, 4)}</Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row>{book_cards.slice(4)}</Row>
              </Carousel.Item>
            </Carousel>
          </Container>
        </div>
      );
    } else {
      return <Container></Container>;
    }
  }
}

const mapStateToProps = (state) => ({
  recent_additions: state.library.recent_additions,
});

export default connect(mapStateToProps, { getRecents })(RecentAdditions);
