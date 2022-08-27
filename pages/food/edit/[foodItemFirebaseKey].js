import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleFoodItem } from '../../../api/foodItemData';
import FoodItemForm from '../../../components/forms/FoodItemForm';

export default function EditFoodItemPage() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { foodItemFirebaseKey } = router.query;

  useEffect(() => {
    getSingleFoodItem(foodItemFirebaseKey).then(setEditItem);
  }, [foodItemFirebaseKey]);

  return (
    <div>
      <FoodItemForm obj={editItem} />
    </div>
  );
}
