import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserFoodItems = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/food.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleFoodItem = (foodItemFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/food/${foodItemFirebaseKey}.json`)
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
  axios.post(`${dbUrl}/food.json`, foodObj)
    .then((response) => {
      const payload = { foodItemFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/food/${payload.foodItemFirebaseKey}.json`, payload)
        .then(resolve);
    })
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
