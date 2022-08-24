import React, { useEffect, useState } from 'react';
import getFoodItemandCategories from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';

export default function MyFoodPage() {
  // eslint-disable-next-line no-unused-vars
  const [foodObject, setFoodObject] = useState();
  const { user } = useAuth();

  useEffect(() => {
    getFoodItemandCategories(user.uid).then((response) => setFoodObject(response));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.warn(foodObject, 'looking for this one');

  return (
    <div>
      <div>myFoodPage</div>
    </div>
  );
}
