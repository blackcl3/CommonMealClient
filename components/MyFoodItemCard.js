import PropTypes, { bool, string } from 'prop-types';
import React from 'react';
import {
  Recycle, PencilSquare, Trash3Fill,
} from 'react-bootstrap-icons';
import { Button, Card } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { useRouter } from 'next/router';
import { updateFoodItem, deleteFoodItem } from '../api/foodItemData';
import { useAuth } from '../utils/context/authContext';

export default function MyFoodItemCard({ obj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteFoodItemCard = () => {
    if (window.confirm(`Delete your ${obj.name}?`)) {
      deleteFoodItem(obj.foodItemFirebaseKey).then(() => onUpdate());
    }
  };

  const giveAwayFoodItem = () => {
    if (window.confirm(`You sure you want to give away your ${obj.name}? Looks pretty good!`)) {
      const updatedObj = obj;
      updatedObj.status = 'available';
      updateFoodItem(updatedObj, user.uid).then(() => {
        router.push('/food/public/publicItems');
      });
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
          <Button size="lg" onClick={giveAwayFoodItem}>
            <Recycle />
          </Button>
          <Button variant="outline-primary" size="lg" href={`/food/edit/${obj.foodItemFirebaseKey}`} passhref="true">
            <PencilSquare />
          </Button>
          <Button variant="danger" size="lg" onClick={deleteFoodItemCard}>
            <Trash3Fill />
          </Button>
        </div>
        {/* <div className="publicIcon">
          {obj.isPublic ? (
            <>
              <Eye />
              <span>This Item is Public</span>
            </>
          ) : (
            <>
              <EyeSlash />
              <span>This Item is Private</span>
            </>
          )}
        </div> */}
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
    status: string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
