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

  generateItems(cards) {
    let items = [];
    for (var i = 0; i < cards.length; i += 4) {
      let start = i == 0 ? 0 : cards.length - (cards.length - 4);
      let end = i + 4 < cards.length ? i + 4 : cards.length;
      items.push(
        <Carousel.Item>
          <Row>{cards.slice(start, end)}</Row>
        </Carousel.Item>
      );
    }
    return items;
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
          <Container>
            <Carousel interval={4000} controls={false} indicators={false}>
              {this.generateItems(book_cards)}
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
