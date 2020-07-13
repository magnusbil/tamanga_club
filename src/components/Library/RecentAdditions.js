import React from 'react';
import { Card, Carousel, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecents } from '../../actions/library';
import NoData from '../common/NoData';

class RecentAdditions extends React.Component {
  static propTypes = {
    getRecents: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getRecents();
  }

  generateItems(cards) {
    let items = [];
    cards = cards.reverse();
    for (var i = 0; i < cards.length / this.props.card_break_size; i++) {
      let start = i * this.props.card_break_size;
      let end = start + this.props.card_break_size;
      items.push(
        <Carousel.Item key={'carousel_item_' + i}>
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
          <a
            href={'/series/' + book.series_title}
            key={book.series + '_' + book.volume_number}
          >
            <Card className="img-card">
              <Card.Img
                src={book.cover_image}
                className="book-img book-img-select"
              />
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
      return <NoData />;
    }
  }
}

const mapStateToProps = (state) => ({
  recent_additions: state.library.recent_additions,
  card_break_size: state.ui.card_break_size,
});

export default connect(mapStateToProps, { getRecents })(RecentAdditions);
