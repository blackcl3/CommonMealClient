import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserFoodItems = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/food?uid=${uid}`)
    .then((response) => {
      if (response) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleFoodItem = (foodItemId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/food/${foodItemId}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getPublicFoodItems = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/food.json?orderBy="status"&equalTo="available"`)
    .then((response) => {
      if (response) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createFoodItem = (foodObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/food`, foodObj)
    .then((response) => resolve(response))
    .catch(reject);
});

const updateFoodItem = (foodObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/food/${foodObj.foodItemFirebaseKey}.json`, foodObj)
    .then(() => getUserFoodItems(uid).then(resolve))
    .catch(reject);
});

const deleteFoodItem = (foodItemFirebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/food/${foodItemFirebaseKey}.json`)
    .then(() => getUserFoodItems(uid).then(resolve))
    .catch(reject);
});

export {
  getUserFoodItems, getSingleFoodItem, getPublicFoodItems, createFoodItem, updateFoodItem, deleteFoodItem,
};
