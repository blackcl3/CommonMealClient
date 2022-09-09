import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes, { string } from 'prop-types';

export default function TransactionCard({ obj }) {
  return (
    <Card>
      <Card.Title>Category: {obj.categoryName}</Card.Title>
      <Card.Body>Recipient: {obj.toUid}</Card.Body>
      <Card.Body>Gave: {obj.fromUid}</Card.Body>
    </Card>
  );
}

TransactionCard.propTypes = {
  obj: PropTypes.shape({
    categoryName: string,
    toUid: string,
    fromUid: string,
  }).isRequired,
};
