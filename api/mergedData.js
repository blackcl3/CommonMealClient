import { getSingleFoodCategory } from './categoryData';
import { getPublicFoodItems, getUserFoodItems } from './foodItemData';
import { getSingleUserProfile } from './profileData';
import { getTransactions } from './transactionData';

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

const getTransactionsAndDisplayNames = () => new Promise((resolve, reject) => {
  getTransactions()
    .then((transactionArr) => {
      // const getFromUserProfiles = getSingleUserProfile(transObj.fromUid));
      // const getToUserProfiles = transactionArr.map((transObj) => getSingleUserProfile(transObj.toUid));
      // Promise.all(getFromUserProfiles, getToUserProfiles).then((fromProfileObj, toProfileObj) => (transactionArr.map((transObj) => ({ ...transObj, fromProfileObj, toProfileObj }))))
      //   .then(resolve);
      // eslint-disable-next-line array-callback-return
      Promise.all(transactionArr.map((transObj) => {
        // eslint-disable-next-line no-undef, no-unused-expressions
        [getSingleUserProfile(transObj.fromUid), getSingleUserProfile(transobj.toUid)];
      }));
    })
    .catch(reject);
});

export { getFoodItemandCategories, getPublicFoodItemAndCategories, getTransactionsAndDisplayNames };
