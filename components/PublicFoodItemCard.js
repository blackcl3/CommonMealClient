import { useRouter } from 'next/router';
import PropTypes, { bool, string } from 'prop-types';
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
    if (obj.uid === user.uid) {
      window.confirm('You already gave this away!');
    } else if (window.confirm(`This ${obj.name} looks great! Be sure to use it.`)) {
      const transactionObj = {
        fromUid: obj.uid,
        toUid: user.uid,
        dateCreated: date(),
        foodItemFirebaseKey: obj.foodItemFirebaseKey,
        categoryFirebaseKey: obj.categoryFirebaseKey,
        categoryName: obj.categoryName,
      };
      const updatedObj = obj;
      updatedObj.status = 'open';
      updatedObj.uid = user.uid;
      createTransaction(transactionObj).then(updateFoodItem(updatedObj, user.uid))
        .then(() => {
          router.push('/food/myFood');
        });
    }
  };

  // to do: call needs to get users by UID to reflect displayName; right now, it's just showing my display name
  // may need to add display name to food obj; otherwise I'll need a merge call for users/uids (may be implementing anyways)

  return (
    <Card className="food-card">
      <Card.Img variant="top" src={obj.photoURL} onClick={handleClick} />
      <Card.Body className="food-card-body">
        <div className="food-card-title-div">
          <h2>{obj.name}</h2>
        </div>
        <Card.Subtitle>category: {obj.categoryName}</Card.Subtitle>
        <Card.Subtitle>location: {obj.location}</Card.Subtitle>
        <Card.Subtitle>added: {obj.dateAddedToDB}</Card.Subtitle>
        {/* <Card.Subtitle>donated by: TO DO</Card.Subtitle> */}
        <Card.Text>description: &quot;{obj.description}&quot;</Card.Text>
        <div className="public-items-select-btn-div">
          <Button variant="success" className="public-items-select-btn" onClick={switchCardOwner}>
            SELECT
          </Button>
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
    photoURL: string,
    isPublic: bool,
    dateAddedToDB: string,
    location: string,
    foodItemFirebaseKey: string,
    categoryName: string,
    uid: string,
  }).isRequired,
};
