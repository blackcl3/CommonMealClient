import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSingleNeighborhood = (neighborhoodId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/neighborhoods/${neighborhoodId}`)
    .then((response) => {
      resolve((response.data));
    })
    .catch(reject);
});

const getNeighborhoods = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/neighborhoods`)
    .then((response) => {
      resolve((response.data));
    })
    .catch(reject);
});

export { getSingleNeighborhood, getNeighborhoods };
