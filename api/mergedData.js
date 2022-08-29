import { getSingleFoodCategory } from './categoryData';
import { getPublicFoodItems, getUserFoodItems } from './foodItemData';

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

const getPublicFoodItemAndCategories = (uid) => new Promise((resolve, reject) => {
  getPublicFoodItems(uid)
    .then((foodArr) => {
      const getFoodItemCategories = foodArr.map((foodObj) => getSingleFoodCategory(foodObj.categoryFirebaseKey).then((categoryObj) => ({ ...foodObj, categoryName: categoryObj.name })));
      Promise.all(getFoodItemCategories).then(resolve);
    })
    .catch(reject);
});

export { getFoodItemandCategories, getPublicFoodItemAndCategories };
