import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleFoodItem } from '../../../api/foodItemData';
import FoodItemForm from '../../../components/forms/FoodItemForm';

export default function EditFoodItemPage() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { foodItem } = router.query;

  useEffect(() => {
    getSingleFoodItem(foodItem).then(setEditItem);
  }, [foodItem]);

  return (
    <div>
      <FoodItemForm obj={editItem} />
    </div>
  );
}
