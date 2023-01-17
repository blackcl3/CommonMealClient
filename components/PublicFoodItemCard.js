/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import PropTypes, { bool, shape, string } from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { updateFoodItem } from '../api/foodItemData';
import { createTransaction } from '../api/transactionData';
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
      // const updatedObj = obj;
      // updatedObj.status = 'open';
      // updatedObj.uid = user.uid;
      // createTransaction(transactionObj).then(updateFoodItem(updatedObj, user.uid))
      //   .then(() => {
      //     router.push('/food/myFood');
      //   });
    }
  };

  // to do: call needs to get users by UID to reflect displayName; right now, it's just showing my display name
  // may need to add display name to food obj; otherwise I'll need a merge call for users/uids (may be implementing anyways)

  return (
    <Card className="public-food-item-card">
      <Card.Img variant="top" src={obj.photo_url} onClick={handleClick} />
      <Card.Body className="food-card-body">
        <div className="food-card-title-div">
          <h2>{obj.name}</h2>
        </div>
        <Card.Subtitle>categories: {obj.food_item_category?.map((foodItemObj) => (<p>{foodItemObj.category.name}</p>))}</Card.Subtitle>
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
    description: string,
    name: string,
    categoryFirebaseKey: string,
    photo_url: string,
    isPublic: bool,
    date: string,
    location: string,
    foodItemFirebaseKey: string,
    food_item_category: shape({
      name: string,
    }),
    uid: string,
  }).isRequired,
};
