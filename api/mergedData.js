import { getSingleFoodCategory } from './categoryData';
import getUserFoodItems from './foodItemData';

const getFoodItemandCategories = (uid) => new Promise((resolve, reject) => {
  getUserFoodItems(uid)
    .then((foodArr) => {
      const getFoodItemCategories = foodArr.map(
        (foodObj) => getSingleFoodCategory(foodObj.categoryFirebaseKey)
          .then((categoryObj) => ({ ...foodObj, categoryName: categoryObj.name })),
      );
      Promise.all(getFoodItemCategories).then(resolve);
    })
    .catch(reject);
});

export default getFoodItemandCategories;
