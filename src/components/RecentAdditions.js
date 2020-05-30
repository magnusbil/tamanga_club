import React from 'react';
import { Card, Carousel, Container, Row } from 'react-bootstrap';
import { API_BASE_URL } from '../api-config';

class RecentAdditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: [],
      window_width: 0,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    fetch(process.env.API_BASE_URL + 'catalogue/recents')
      .then((res) => res.json())
      .then((bookList) => {
        this.setState({
          bookList: bookList,
        });
      });

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    if (this.state.bookList.length > 0) {
      var book_cards = this.state.bookList.map(function (book) {
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
          <Container controls={false}>
            <Carousel>
              {/* for right now these values are static because I know the data is there.
              I plan to make this dynamic after the poc is done */}
              <Carousel.Item>
                <Row>{book_cards.slice(0, 4)}</Row>
              </Carousel.Item>
              <Carousel.Item>
                <Row>{book_cards.slice(4)}</Row>
              </Carousel.Item>
            </Carousel>
          </Container>
        </div>
      );
    } else {
      return <Container></Container>;
    }
  }
}

export default RecentAdditions;
