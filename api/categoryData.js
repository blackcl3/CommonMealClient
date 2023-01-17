import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFoodCategories = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/categories`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleFoodCategory = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/categories/${categoryId}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export { getFoodCategories, getSingleFoodCategory };
