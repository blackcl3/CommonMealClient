import { getSingleFoodCategory } from './categoryData';
import getUserFoodItems from './foodItemData';

const getFoodItemandCategories = (uid) => new Promise((resolve, reject) => {
  getUserFoodItems(uid)
    .then((foodArr) => {
      console.warn(foodArr);
      Promise.all(foodArr.map((foodObj) => getSingleFoodCategory(foodObj.categoryFirebaseKey))).then(resolve);
    })
    .catch(reject);
});

export default getFoodItemandCategories;
