import React, { useEffect, useState } from 'react';
import getFoodItemandCategories from '../../api/mergedData';
import MyFoodItemCard from '../../components/MyFoodItemCard';
import { useAuth } from '../../utils/context/authContext';

export default function MyFoodPage() {
  // eslint-disable-next-line no-unused-vars
  const [foodObject, setFoodObject] = useState();
  const { user } = useAuth();

  const getUserFoods = () => {
    getFoodItemandCategories(user.uid).then(setFoodObject);
  };

  useEffect(() => {
    getUserFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.warn(foodObject, 'inside useeffect');
  }, []);

  console.warn(foodObject, 'this one should show array');
  return (
    <>
      <div>
        <div>myFoodPage</div>
        {foodObject?.map((foodItem) => (
          <MyFoodItemCard obj={foodItem} onChange={getFoodItemandCategories} />
        ))}
      </div>
    </>
  );
}
