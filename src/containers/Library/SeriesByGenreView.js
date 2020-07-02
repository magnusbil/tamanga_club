import React from 'react';
import { Card, Container, Row, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGenreSeries, setCurrentSeries } from '../../actions/library';
import Loading from '../../components/common/Loading';
import LibraryNav from '../../components/Library/LibraryNav';
import NoData from '../../components/common/NoData';

const SeriesRow = (props) => {
  return <Row className="display-row">{props.cards}</Row>;
};

const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Miscellaneous',
  'Slice of Life',
  'Yoai',
  'Yuri',
];

class SeriesByGenreView extends React.Component {
  static propTypes = {
    getGenreSeries: PropTypes.func.isRequired,
    setCurrentSeries: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (!this.props.series_list) {
      this.props.getGenreSeries(this.props.genre);
    }
  }

  onSubmit(series_data) {
    this.setCurrentSeries(series_data);
  }

  renderGenreNav() {
    const links = GENRES.map((genre) => {
      return (
        <Nav.Item key={genre}>
          <Nav.Link
            eventKey={genre}
            href={'/search/by_genre/' + genre.toLowerCase()}
          >
            {genre}
          </Nav.Link>
        </Nav.Item>
      );
    });

    return (
      <Nav variant="tabs" defaultActiveKey={this.props.genre}>
        {links}
      </Nav>
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
        {this.renderGenreNav()}
        {this.renderSeries()}
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapPropsToState = (state, ownProps) => ({
  genre: ownProps.match.params.genre,
  series_list: state.library.series_list,
});

export default connect(mapPropsToState, { getGenreSeries, setCurrentSeries })(
  SeriesByGenreView
);
