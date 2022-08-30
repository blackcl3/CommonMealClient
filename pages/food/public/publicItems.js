import React, { useEffect, useState } from 'react';
import { getPublicFoodItemAndCategories } from '../../../api/mergedData';
import PublicFoodItemCard from '../../../components/PublicFoodItemCard';

export default function PublicItems() {
  // eslint-disable-next-line no-unused-vars
  const [foodObject, setFoodObject] = useState();

  const getPublicFoods = () => {
    getPublicFoodItemAndCategories().then(setFoodObject);
  };

  useEffect(() => {
    getPublicFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>PUBLIC ITEMS</h1>
      <h2>FOOD FOR SALE (ACTUALLY, IT’S FREE)</h2>
      <div>
        {foodObject?.map((foodObj) => (
          <PublicFoodItemCard key={foodObj.foodItemFirebaseKey} obj={foodObj} onChange={getPublicFoodItemAndCategories} onUpdate={getPublicFoods} />
        ))}
      </div>
    </>
  );
}
