import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPublicFoodComments } from '../../../api/commentData';
import { getSingleFoodItem } from '../../../api/foodItemData';
import CommentCard from '../../../components/commentCard';
import CommentForm from '../../../components/forms/CommentForm';
import PublicFoodItemCard from '../../../components/PublicFoodItemCard';

export default function IndividualFoodItemPage() {
  const [foodItemDetails, setFoodItemDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [commentToUpdate, setCommentUpdate] = useState({});
  const router = useRouter();
  const { foodItemFirebaseKey } = router.query;

  function getFoodItemDetails() {
    getSingleFoodItem(foodItemFirebaseKey).then(setFoodItemDetails).then(() => getPublicFoodComments(foodItemFirebaseKey).then(setComments));
  }
  useEffect(() => {
    const abortController = new AbortController();
    getFoodItemDetails();
    return () => {
      abortController.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  return (
    <>
      <h1 className="publicFoodItemTitle">Public Food Item</h1>
      <div className="individual-public-food-item-div">
        <PublicFoodItemCard obj={foodItemDetails} className="public-food-item-card-individual" />
        <div>
          <h3 className="publicFoodItemTitle">Comments</h3>
          {comments?.map((comment) => (
            <CommentCard obj={comment} key={comment.commentFirebaseKey} setCommentUpdate={setCommentUpdate} />
          ))}
          <CommentForm foodItemFirebaseKey={foodItemFirebaseKey} obj={commentToUpdate} />
        </div>
      </div>
    </>
  );
}
