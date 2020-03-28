import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;
const Book = (props) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={props.data.image} />}
    >
      <Meta title={"Vol. " + props.data.number} description={"Available: " + props.data.available} />
    </Card>
  );
}

export default Book;