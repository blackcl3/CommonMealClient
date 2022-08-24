import PropTypes, { string } from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function MyFoodItemCard({ obj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={obj.photoUrl} />
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>Description Here.</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

MyFoodItemCard.propTypes = {
  obj: PropTypes.shape({
    name: string,
    categoryName: string,
    photoUrl: string,
    isPublic: Boolean,
  }).isRequired,
};
