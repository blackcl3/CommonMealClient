import PropTypes, { bool, string } from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function PublicFoodItemCard({ obj }) {
  const { user } = useAuth();

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
        <Card.Subtitle>donated by: {user.displayName}</Card.Subtitle>
        <Card.Text>description: &quot;{obj.description}&quot;</Card.Text>

        <Button variant="">SELECT</Button>
      </Card.Body>
    </Card>
  );
}

PublicFoodItemCard.propTypes = {
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
};
