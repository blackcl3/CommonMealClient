import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleFoodItem } from '../../../api/foodItemData';
import PublicFoodItemCard from '../../../components/PublicFoodItemCard';
import { useAuth } from '../../../utils/context/authContext';

export default function IndividualFoodItemPage() {
  const [foodItemDetails, setFoodItemDetails] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { foodItemFirebaseKey } = router.query;

  function getFoodItemDetails() {
    getSingleFoodItem(foodItemFirebaseKey).then(setFoodItemDetails);
  }

  useEffect(() => {
    getFoodItemDetails();
    console.warn(user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Individual Food Item Page</h1>
      <PublicFoodItemCard obj={foodItemDetails} />
      <div>
        <h3>Section for Comments</h3>
      </div>
    </>
  );
}
