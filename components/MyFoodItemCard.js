import PropTypes, { bool, string } from 'prop-types';
import React from 'react';
import { Recycle, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import { Button, Card } from 'react-bootstrap';
import { deleteFoodItem } from '../api/foodItemData';

export default function MyFoodItemCard({ obj, onUpdate }) {
  const deleteFoodItemCard = () => {
    if (window.confirm(`Delete your ${obj.name}?`)) {
      deleteFoodItem(obj.foodItemFirebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card className="food-card">
      <Card.Img variant="top" src={obj.photoURL} />
      <Card.Body className="food-card-body">
        <div className="food-card-title-div">
          <h2>{obj.name}</h2>
        </div>
        <Card.Subtitle>category: {obj.categoryName}</Card.Subtitle>
        <Card.Subtitle>location: {obj.location}</Card.Subtitle>
        <Card.Subtitle>added: {obj.dateAddedToDB}</Card.Subtitle>
        <Card.Text>description: &quot;{obj.description}&quot;</Card.Text>
        <div className="food-card-button-group">
          <Button size="lg">
            <Recycle />
          </Button>
          <Button variant="outline-primary" size="lg" href={`/food/edit/${obj.foodItemFirebaseKey}`} passhref="true">
            <PencilSquare />
          </Button>
          <Button variant="danger" size="lg" onClick={deleteFoodItemCard}>
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
    location: string,
    foodItemFirebaseKey: string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
