import { getSingleFoodCategory } from './categoryData';
import { getPublicFoodItems, getUserFoodItems } from './foodItemData';
import { getUserProfiles } from './profileData';
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
  Promise.all([getTransactions(), getUserProfiles()]).then(([transactions, profiles]) => {
    const allTransactionInfoArr = transactions.map((transaction) => {
      const fromUserProfile = profiles.filter((profile) => profile.uid === transaction.fromUid);
      const toUserProfile = profiles.filter((profile) => profile.uid === transaction.toUid);

      return ({ ...transaction, fromUser: fromUserProfile, toUser: toUserProfile });
    });
    resolve(allTransactionInfoArr);
  })
    .catch(reject);
});

export { getFoodItemandCategories, getPublicFoodItemAndCategories, getTransactionsAndDisplayNames };
