import PropTypes, {
  string, number, arrayOf,
} from 'prop-types';
import React from 'react';
import {
  Recycle, PencilSquare, Trash3Fill,
} from 'react-bootstrap-icons';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteFoodItem, giveAwayFood } from '../api/foodItemData';

export default function MyFoodItemCard({
  name, description, photoURL, location, date, id, uid, category, onUpdate,
}) {
  const router = useRouter();

  const deleteFoodItemCard = () => {
    if (window.confirm(`Delete your ${name}?`)) {
      deleteFoodItem(id).then(() => onUpdate());
    }
  };

  const giveAwayFoodItem = () => {
    if (window.confirm(`You sure you want to give away your ${name}? Looks pretty good!`)) {
      const updatedObj = {
        id,
        uid,
      };
      giveAwayFood(updatedObj).then(() => {
        router.push('/food/public/publicItems');
      });
    }
  };

  return (
    <Card className="food-card">
      <Card.Img variant="top" src={photoURL} />
      <Card.Body className="food-card-body">
        <div className="food-card-title-div">
          <h2>{name}</h2>
        </div>
        <Card.Subtitle>
          category:
          {category.map((cat) => (
            <Button key={cat.category.id} variant="outline-info" disabled className="category-name">
              {cat.category.name}{' '}
            </Button>
          ))}
        </Card.Subtitle>
        <Card.Subtitle>location: {location}</Card.Subtitle>
        <Card.Subtitle>added: {date}</Card.Subtitle>
        <Card.Text className="food-card-description">description: &quot;{description}&quot;</Card.Text>
        <div className="food-card-button-group">
          <Button size="lg" onClick={giveAwayFoodItem} className="recycleBtn">
            <Recycle />
          </Button>
          <Button variant="outline-primary" size="lg" href={`/food/edit/${id}`} passhref="true" className="editBtn">
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
  description: string.isRequired,
  name: string.isRequired,
  date: string.isRequired,
  location: string.isRequired,
  id: number.isRequired,
  uid: string.isRequired,
  photoURL: string.isRequired,
  category: arrayOf(PropTypes.shape).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
