import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPublicFoodComments = (foodItemFirebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/comment.json?orderBy="foodItemFirebaseKey"&equalTo="${foodItemFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createPublicFoodComment = (commentObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/comment.json`, commentObj)
    .then((response) => {
      const payload = { commentFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/comment/${payload.commentFirebaseKey}.json`, payload)
        .then(resolve);
    })
    .catch(reject);
});

const updateComment = (commentObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/comment/${commentObj.commentFirebaseKey}.json`, commentObj)
    .then(() => getPublicFoodComments(commentObj.foodItemFirebaseKey).then(resolve))
    .catch(reject);
});

export { getPublicFoodComments, createPublicFoodComment, updateComment };
