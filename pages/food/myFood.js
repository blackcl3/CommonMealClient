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
    console.warn(foodObject, 'inside useeffect');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <div>
          <h1>{user.displayName}&apos;s Kitchen</h1>
        </div>
        <div className="food-card-container container">
          {foodObject?.map((foodItem) => (
            <MyFoodItemCard obj={foodItem} onChange={getFoodItemandCategories} />
          ))}
        </div>
      </div>
    </>
  );
}
