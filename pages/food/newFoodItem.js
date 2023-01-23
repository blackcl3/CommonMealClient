import React, { useEffect, useState } from 'react';
import { getFoodCategories } from '../../api/categoryData';
import FoodItemForm from '../../components/forms/FoodItemForm';

export default function NewFoodItem() {
  const [categories, setFoodCategories] = useState([]);

  function getPageContent() {
    getFoodCategories().then(setFoodCategories);
  }

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FoodItemForm categories={categories} />
    </div>
  );
}
