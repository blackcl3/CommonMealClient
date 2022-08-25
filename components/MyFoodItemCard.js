import PropTypes, { bool, string } from 'prop-types';
import React from 'react';
import { Recycle, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import { Button, Card } from 'react-bootstrap';

export default function MyFoodItemCard({ obj }) {
  return (
    <Card className="food-card">
      <Card.Img variant="top" src={obj.photoURL} />
      <Card.Body className="food-card-body">
        <div className="food-card-title-div">
          <Card.Title>{obj.name}</Card.Title>
        </div>
        <Card.Subtitle>category: {obj.categoryName}</Card.Subtitle>
        <Card.Text>added: {obj.dateAddedToDB}</Card.Text>
        <Card.Text>description: &quot;{obj.description}&quot;</Card.Text>
        <div className="food-card-button-group">
          <Button size="lg">
            <Recycle />
          </Button>
          <Button variant="outline-primary" size="lg">
            <PencilSquare />
          </Button>
          <Button variant="danger" size="lg">
            <Trash3Fill />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MyFoodItemCard.propTypes = {
  obj: PropTypes.shape({
    description: string,
    name: string,
    categoryName: string,
    photoURL: string,
    isPublic: bool,
    dateAddedToDB: string,
  }).isRequired,
};
