import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Container, Col, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleSeries, reserveBook } from '../../actions/library';
import Loading from '../../components/common/Loading';

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
    e.preventDefault();
    this.props.reserveBook(this.props.user.id, this.state.selection.id);
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
        <Col className="book" key={book.volume_number}>
          <Card className="img-card">
            <Card.Img
              src={book.cover_image}
              className="book-img-select series-detail-book"
              onClick={() => this.toggle(book)}
            />
          </Card>
        </Col>
      );
    }, this);

    // Constructs rows out of the book cards created above
    for (var i = 0; i < book_cards.length; i++) {
      cards.push(book_cards[i]);
      if (cards.length === 3 || i === book_cards.length - 1) {
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
    return this.props.series_data ? this.renderSeriesDetails() : <Loading />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  title: ownProps.match.params.title,
  series_data: state.library.current_series_data,
});

export default connect(mapStateToProps, { getSingleSeries, reserveBook })(
  SeriesDetailView
);
