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
    .then((response) => response.data)
    .then((data) => {
      resolve({
        id: data.id,
        name: data.name,
        date: data.date,
        description: data.description,
        photoURL: data.photo_url,
        location: data.location,
        foodItemCategory: data.food_item_category,
      });
    })
    .catch(reject);
});

const getPublicFoodItems = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/food?status=available`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createFoodItem = (foodObj) => new Promise((resolve, reject) => {
  const foodObject = {
    date: foodObj.date,
    description: foodObj.description,
    location: foodObj.location,
    name: foodObj.name,
    photo_url: foodObj.photoURL,
    status: foodObj.status,
    uid: foodObj.uid,
    category: foodObj.category,
  };
  axios.post(`${dbUrl}/food`, foodObject)
    .then((response) => resolve(response))
    .catch(reject);
});

const updateFoodItem = (foodObj) => new Promise((resolve, reject) => {
  const foodObject = {
    id: foodObj.id,
    date: foodObj.date,
    description: foodObj.description,
    location: foodObj.location,
    name: foodObj.name,
    photo_url: foodObj.photoURL,
    status: foodObj.status,
    uid: foodObj.uid,
    category: foodObj.category,
  };
  axios.put(`${dbUrl}/food/${foodObject.id}`, foodObject)
    .then(resolve)
    .catch(reject);
});

const giveAwayFood = (foodObject) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/food/${foodObject.id}/giveaway`)
    .then(resolve)
    .catch(reject);
});

const claimItem = (foodObject) => new Promise((resolve, reject) => {
  axios.put(`${dbUrl}/food/${foodObject.id}/claim`, foodObject)
    .then(resolve)
    .catch(reject);
});

const deleteFoodItem = (foodItemId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/food/${foodItemId}`)
    .then(resolve)
    .catch(reject);
});

export {
  getUserFoodItems, getSingleFoodItem, getPublicFoodItems, createFoodItem, updateFoodItem, giveAwayFood, claimItem, deleteFoodItem,
};
