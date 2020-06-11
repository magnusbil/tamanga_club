import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Container, Col, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleSeries } from '../../actions/library';
import Loading from '../../components/common/Loading';

const BookRow = (props) => {
  return <Row className="display-row">{props.cards}</Row>;
};

class SeriesDetailView extends React.Component {
  state = {
    show_modal: false,
    selected_volume: '',
  };

  componentDidMount() {
    if (!this.props.series_data) {
      this.props.getSingleSeries(this.props.title);
    }
  }

  // Toggles the reservation modal
  toggle() {
    this.setState({
      show_modal: !this.state.show_modal,
    });
  }

  generateBookRows() {
    var cards = [];
    var rows = [];
    // Creates an array of Cards that contain individual book data
    var book_cards = this.props.series_data.volumes.map(function (book) {
      return (
        <Col sm={{ size: 3, order: 1, offset: 0 }} key={book.volume_number}>
          <Card className="img-card">
            <Card.Img
              src={book.cover_image}
              className="book-img"
              onClick={() =>
                this.toggle(
                  this.props.series_data.series_title +
                    ' Vol. ' +
                    book.volume_number
                )
              }
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
        <div className="coll pt-5">
          <Container>
            {rows}
            {/* Create a reservation modal that appears when you click on a book */}
            <Modal
              centered={true}
              show={show_modal}
              onHide={() => this.toggle.bind(this)}
            >
              <Modal.Header>
                Reserve {this.props.series_data.series_title}?
              </Modal.Header>
              <Modal.Body>
                <Button>Reserve</Button>
                <Button onClick={() => this.toggle()}>Cancel</Button>
              </Modal.Body>
            </Modal>
          </Container>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }

  render() {
    console.log('CURRENT_DATA: ' + this.props.series_data);
    return this.props.series_data ? this.renderSeriesDetails() : <Loading />;
  }
}

const mapStateToProps = (state, thisProps) => ({
  title: thisProps.match.params.title,
  series_data: state.library.current_series_data,
});

export default connect(mapStateToProps, { getSingleSeries })(SeriesDetailView);
