import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSingleUserProfile = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/profile.json?orderBy="uid"&equalTo="${uid}"`).then((response) => {
    if (response) {
      resolve(Object.values(response.data));
    } else {
      resolve(null);
    }
  })
    .catch(reject);
});

const createUserProfile = (profileObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/profile.json`, profileObj)
    .then((response) => {
      const payload = { profileFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/profile/${payload.profileFirebaseKey}.json`, payload)
        .then(resolve);
    })
    .catch(reject);
});

export { getSingleUserProfile, createUserProfile };
