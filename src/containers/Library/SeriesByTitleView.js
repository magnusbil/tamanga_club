import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllSeries, setCurrentSeries } from '../../actions/library';
import Loading from '../../components/common/Loading';
import LibraryNav from '../../components/Library/LibraryNav';
import NoData from '../../components/common/NoData';
import Paginator from '../../components/common/Paginator';

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
                className="book-img book-img-select"
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
        <Paginator
          split_by={21}
          base_url="/series/by_title/page="
          page_number={this.props.page_number}
          total={this.props.total_polls}
        />
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapPropsToState = (state, ownProps) => ({
  series_list: state.library.series_list,
  page_number: ownProps.match.params.page_number - 1,
  total_series: state.library.total_series,
});

export default connect(mapPropsToState, { getAllSeries, setCurrentSeries })(
  SeriesByTitleView
);
