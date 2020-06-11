import React from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllSeries, setCurrentSeries } from '../../actions/library';
import Loading from '../../components/common/Loading';

const SeriesRow = (props) => {
  return <Row className="display-row">{props.cards}</Row>;
};

class SeriesListView extends React.Component {
  static propTypes = {
    getAllSeries: PropTypes.func.isRequired,
    setCurrentSeries: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllSeries();
  }

  onSubmit(series_data) {
    this.setCurrentSeries(series_data);
  }

  renderSeries() {
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
            <Card.Img src={series.series_cover_image} className="book-img" />
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

    return (
      <div className="col pt-5">
        <Container>{rows}</Container>
      </div>
    );
  }

  render() {
    return this.props.series_list ? this.renderSeries() : <Loading />;
  }
}

const mapPropsToState = (state) => ({
  series_list: state.library.series_list,
});

export default connect(mapPropsToState, { getAllSeries, setCurrentSeries })(
  SeriesListView
);
