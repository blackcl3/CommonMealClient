import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserProfiles = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users`)
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
  axios.get(`${dbUrl}/users?uid=${uid}`)
    .then((response) => (response.data))
    .then((data) => {
      resolve(({
        id: data[0].id,
        name: data[0].name,
        uid: data[0].uid,
        photoURL: data[0].photo_url,
        publicProfile: data[0].public_profile,
        address: data[0].address,
        neighborhood: data[0].neighborhood,
      }));
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
  getUserProfiles, getSingleUserProfile, getSingleUserObj, createUserProfile, updateProfile,
};
