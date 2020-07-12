import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Pagination } from 'react-bootstrap';

class Paginator extends React.Component {
  static propTypes = {
    setPage: PropTypes.func.isRequired,
  };

  render() {
    let items = [];
    items.push(
      <Pagination.Item
        key={'page_item_' + 1}
        active={this.props.page_number === 0}
        onClick={() => this.props.setPage(0)}
      >
        1
      </Pagination.Item>
    );
    let capacity = Math.ceil(this.props.total / this.props.split_by);
    for (let i = 1; i < capacity; i++) {
      items.push(
        <Pagination.Item
          key={'page_item_' + (i + 1)}
          active={this.props.page_number === i}
          onClick={() => this.props.setPage(i)}
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
}

export default Paginator;
