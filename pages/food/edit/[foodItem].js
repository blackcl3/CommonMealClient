import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getFoodCategories } from '../../../api/categoryData';
import { getSingleFoodItem } from '../../../api/foodItemData';
import FoodItemForm from '../../../components/forms/FoodItemForm';

export default function EditFoodItemPage() {
  const [editItem, setEditItem] = useState({});
  const [categories, setFoodCategories] = useState([]);
  const router = useRouter();
  const { foodItem } = router.query;

  function getPageContent() {
    getFoodCategories().then(setFoodCategories);
  }

  useEffect(() => {
    getPageContent();
    getSingleFoodItem(foodItem).then(setEditItem);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodItem]);

  return (
    <div>
      <FoodItemForm obj={editItem} categories={categories} />
    </div>
  );
}
