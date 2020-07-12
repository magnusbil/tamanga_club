import React from 'react';
import { Card, Container, Col, Row, Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllSeries, setCurrentSeries } from '../../actions/library';
import Loading from '../../components/common/Loading';
import LibraryNav from '../../components/Library/LibraryNav';
import NoData from '../../components/common/NoData';

const SeriesRow = (props) => {
  return <Row className="display-row">{props.cards}</Row>;
};

class SeriesByTitleView extends React.Component {
  static propTypes = {
    getAllSeries: PropTypes.func.isRequired,
    setCurrentSeries: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllSeries(this.props.page_number);
  }

  onSubmit(series_data) {
    this.setCurrentSeries(series_data);
  }

  setPage(page_number) {
    this.props.getAllSeries(this.props.user.profile.club, page_number);
  }

  generatePagination() {
    console.log(this.props.page_number);
    let items = [];
    for (let i = 0; i < this.props.total_series / 21; i++) {
      items.push(
        <Pagination.Item
          key={'page_item_' + (i + 1)}
          active={this.props.page_number === i}
          onClick={() => this.setPage(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    return (
      <footer>
        <Row>
          <Col lg={{ span: 3, offset: 5 }}>
            <Pagination>{items}</Pagination>
          </Col>
        </Row>
      </footer>
    );
  }

  renderSeries() {
    if (this.props.series_list.length > 0) {
      var rows = [];
      var cards = [];

      // Generate Cards containg individual Series data
      var series_cards = this.props.series_list.map(function (series) {
        return (
          <a
            href={'/series/' + series.series_title}
            onClick={() => this.onSubmit(series)}
            key={series.series_title}
          >
            <Card className="img-card">
              <Card.Img
                src={series.series_cover_image}
                className="book-img-select"
              />
            </Card>
          </a>
        );
      });

      // construct rows from the series cards,
      for (var i = 0; i < series_cards.length; i++) {
        cards.push(series_cards[i]);
        if (cards.length === 4 || i === series_cards.length - 1) {
          rows.push(<SeriesRow cards={cards} key={i}></SeriesRow>);
          cards = [];
        }
      }

      return <Container className="pt-5">{rows}</Container>;
    } else {
      return <NoData />;
    }
  }

  render() {
    return this.props.series_list ? (
      <div>
        <LibraryNav currentLink="series" />
        {this.renderSeries()}
        {this.generatePagination()}
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapPropsToState = (state) => ({
  series_list: state.library.series_list,
  page_number: state.library.page_number,
});

export default connect(mapPropsToState, { getAllSeries, setCurrentSeries })(
  SeriesByTitleView
);
