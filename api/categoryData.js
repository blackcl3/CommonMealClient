import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFoodCategories = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/category.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleFoodCategory = (categoryFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/category/${categoryFirebaseKey}.json`)
    .then((response) => Object.values(response.data))
    .catch(reject);
});

export { getFoodCategories, getSingleFoodCategory };
