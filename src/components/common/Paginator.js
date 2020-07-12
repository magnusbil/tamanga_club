import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Pagination } from 'react-bootstrap';

class Paginator extends React.Component {
  render() {
    let items = [];
    items.push(
      <Pagination.Item
        key={'page_item_' + 1}
        active={this.props.page_number === 0}
        href={this.props.base_url + 1}
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
          href={this.props.base_url + (i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    return (
      <footer>
        <div className="buffer"></div>
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
