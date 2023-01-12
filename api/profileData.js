import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/checkuser`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getUserProfiles = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/profile.json`)
    .then((response) => {
      if (response) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

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

const getSingleUserObj = (profileFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/profile/${profileFirebaseKey}.json`)
    .then((response) => {
      if (response) {
        resolve((response.data));
      } else {
        resolve([]);
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

const updateProfile = (profileObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/profile/${profileObj.profileFirebaseKey}.json`, profileObj)
    .then(() => getSingleUserObj(uid).then(resolve))
    .catch(reject);
});

export {
  checkUser, getUserProfiles, getSingleUserProfile, getSingleUserObj, createUserProfile, updateProfile,
};
