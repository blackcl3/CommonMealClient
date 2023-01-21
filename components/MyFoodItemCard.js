import PropTypes, {
  bool, string, number, arrayOf,
} from 'prop-types';
import React from 'react';
import {
  Recycle, PencilSquare, Trash3Fill,
} from 'react-bootstrap-icons';
import { Button, Card } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { useRouter } from 'next/router';
import { updateFoodItem, deleteFoodItem } from '../api/foodItemData';
import { useAuth } from '../utils/context/authContext';

export default function MyFoodItemCard({ obj, photoURL, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteFoodItemCard = () => {
    if (window.confirm(`Delete your ${obj.name}?`)) {
      deleteFoodItem(obj.id).then(() => onUpdate());
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
      <Card.Img variant="top" src={photoURL} />
      <Card.Body className="food-card-body">
        <div className="food-card-title-div">
          <h2>{obj.name}</h2>
        </div>
        <Card.Subtitle>
          category:
          {obj.food_item_category.map((cat) => (
            <Button key={cat.category.id} variant="outline-info" disabled className="category-name">
              {cat.category.name}{' '}
            </Button>
          ))}
        </Card.Subtitle>
        <Card.Subtitle>location: {obj.location}</Card.Subtitle>
        <Card.Subtitle>added: {obj.date}</Card.Subtitle>
        <Card.Text className="food-card-description">description: &quot;{obj.description}&quot;</Card.Text>
        <div className="food-card-button-group">
          <Button size="lg" onClick={giveAwayFoodItem} className="recycleBtn">
            <Recycle />
          </Button>
          <Button variant="outline-primary" size="lg" href={`/food/edit/${obj.id}`} passhref="true" className="editBtn">
            <PencilSquare />
          </Button>
          <Button variant="danger" size="lg" onClick={deleteFoodItemCard} className="deleteBtn">
            <Trash3Fill />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MyFoodItemCard.propTypes = {
  photoURL: PropTypes.string.isRequired,
  obj: PropTypes.shape({
    description: string,
    name: string,
    categoryName: string,
    isPublic: bool,
    date: string,
    location: string,
    id: number,
    status: string,
    food_item_category: arrayOf(PropTypes.shape),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
