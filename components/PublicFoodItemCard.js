/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import PropTypes, {
  arrayOf, bool, number, object, shape, string,
} from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { claimItem, updateFoodItem } from '../api/foodItemData';
import { useAuth } from '../utils/context/authContext';

export default function PublicFoodItemCard({ obj }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/food/public/${obj.foodItemFirebaseKey}`);
  };

  const date = () => {
    const rawDate = new Date();
    const dateString = rawDate.toLocaleString();
    return dateString;
  };

  function optionsMap(cat) {
    const options = cat.map((categoryArr) => ({
      value: categoryArr.id,
      label: categoryArr.name,
    }));
    return options;
  }
  const switchCardOwner = () => {
    if (obj.uid.uid === user.uid) {
      window.confirm('You already gave this away!');
    } else if (window.confirm(`This ${obj.name} looks great! Be sure to use it.`)) {
      // const transactionObj = {
      //   fromUid: obj.uid,
      //   toUid: user.uid,
      //   dateCreated: date(),
      //   foodItemFirebaseKey: obj.foodItemFirebaseKey,
      //   categoryFirebaseKey: obj.categoryFirebaseKey,
      //   categoryName: obj.categoryName,
      // };
      const updatedObj = {
        id: obj.id,
        uid: obj.uid,
      };
      updatedObj.uid = user.uid;
      claimItem(updatedObj).then(() => {
        router.push('/food/myFood');
      });
    }
  };

  return (
    <Card className="public-food-item-card">
      <Card.Img variant="top" src={obj.photo_url} onClick={handleClick} />
      <Card.Body className="food-card-body">
        <div className="food-card-title-div">
          <h2>{obj.name}</h2>
        </div>
        <Card.Subtitle>categories: {obj.food_item_category?.map((foodItemObj) => (<Button key={foodItemObj.category.id} variant="outline-info" disabled className="category-name">{foodItemObj.category.name}</Button>))}</Card.Subtitle>
        <Card.Subtitle>location: {obj.location}</Card.Subtitle>
        <Card.Subtitle>added: {obj.date}</Card.Subtitle>
        <Card.Subtitle>donated by: {obj.uid.name} </Card.Subtitle>
        <Card.Text>description: &quot;{obj.description}&quot;</Card.Text>
        <div className="public-items-select-btn-div">
          {obj.uid.uid === user.uid ? (
            <Button variant="success" disabled className="public-items-select-btn" onClick={switchCardOwner}>
              SELECT
            </Button>
          ) : (
            <Button variant="success" className="public-items-select-btn" onClick={switchCardOwner}>
              SELECT
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

PublicFoodItemCard.propTypes = {
  obj: PropTypes.shape({
    id: number,
    description: string,
    name: string,
    categoryFirebaseKey: string,
    photo_url: string,
    status: string,
    date: string,
    location: string,
    foodItemFirebaseKey: string,
    category: arrayOf(PropTypes.shape),
    food_item_category: arrayOf(PropTypes.shape),
    uid: PropTypes.shape(),
  }).isRequired,
};
