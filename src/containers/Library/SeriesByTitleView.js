import React from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';
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
    this.props.getAllSeries();
  }

  onSubmit(series_data) {
    this.setCurrentSeries(series_data);
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
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapPropsToState = (state) => ({
  series_list: state.library.series_list,
});

export default connect(mapPropsToState, { getAllSeries, setCurrentSeries })(
  SeriesByTitleView
);
