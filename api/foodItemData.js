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

export default getUserFoodItems;
