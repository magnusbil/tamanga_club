import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Container, Col, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleSeries, reserveBook } from '../../actions/library';
import Loading from '../../components/common/Loading';
import LibraryNav from '../../components/Library/LibraryNav';

const BookRow = (props) => {
  return <Row className="display-row">{props.cards}</Row>;
};

class SeriesDetailView extends React.Component {
  state = {
    show_modal: false,
    selection: { volume_number: 0 },
  };

  static propTypes = {
    getSingleSeries: PropTypes.func.isRequired,
    reserveBook: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (!this.props.series_data) {
      this.props.getSingleSeries(this.props.title);
    }
  }

  // Toggles the reservation modal
  toggle(selected_book) {
    this.setState({
      selection: selected_book,
      show_modal: !this.state.show_modal,
    });
  }

  reserve = (e) => {
    this.props.reserveBook(this.props.user.id, this.state.selection.id);
    this.state.selection.hold_for = this.props.user.id;
    this.setState({
      show_modal: false,
    });
  };

  generateBookRows() {
    var cards = [];
    var rows = [];
    // Creates an array of Cards that contain individual book data
    var book_cards = this.props.series_data.volumes.map(function (book) {
      return (
        <Card className="img-card" key={book.volume_number}>
          {book.hold_for ? (
            <Card.Img src={book.cover_image} className="reserved book-img" />
          ) : (
            <Card.Img
              src={book.cover_image}
              className="book-img book-img-select"
              onClick={() => this.toggle(book)}
            />
          )}
        </Card>
      );
    }, this);

    // Constructs rows out of the book cards created above
    for (var i = 0; i < book_cards.length; i++) {
      cards.push(book_cards[i]);
      if (
        cards.length === this.props.card_break_size ||
        i === book_cards.length - 1
      ) {
        rows.push(<BookRow cards={cards} key={i}></BookRow>);
        cards = [];
      }
    }

    return rows;
  }

  renderSeriesDetails() {
    if (Object.keys(this.props.series_data).length > 0) {
      let rows = this.generateBookRows();
      const { show_modal } = this.state;
      return (
        <div className="col pt-5">
          <Container>
            {rows}
            {/* Create a reservation modal that appears when you click on a book */}
            <Modal
              centered={true}
              show={show_modal}
              onHide={() => this.toggle.bind(this)}
            >
              <Modal.Header>
                Reserve {this.props.series_data.series_title}{' '}
                {this.state.selection.volume_number}?
              </Modal.Header>
              <Modal.Body>
                <Button onClick={this.reserve.bind(this)}>Reserve</Button>
                <Button onClick={() => this.toggle(this.state.selection)}>
                  Cancel
                </Button>
              </Modal.Body>
            </Modal>
          </Container>
        </div>
      );
    } else {
      return <Redirect to="/search" />;
    }
  }

  render() {
    return this.props.series_data ? (
      <div>
        <LibraryNav />
        {this.renderSeriesDetails()}
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  title: ownProps.match.params.title,
  user: state.auth.user,
  series_data: state.library.current_series_data,
  card_break_size: state.ui.card_break_size,
});

export default connect(mapStateToProps, { getSingleSeries, reserveBook })(
  SeriesDetailView
);
