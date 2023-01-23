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
        neighborhood: data[0].neighborhood.id,
      }));
    })
    .catch(reject);
});

const createUserProfile = (profileObj) => new Promise((resolve, reject) => {
  const userObj = {
    name: profileObj.name,
    uid: profileObj.uid,
    photo_url: profileObj.photoURL,
    public_profile: profileObj.publicProfile,
    address: profileObj.address,
    neighborhood: Number(profileObj.neighborhood),
  };
  axios.post(`${dbUrl}/users.json`, userObj)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const updateProfile = (profileObj, uid) => new Promise((resolve, reject) => {
  const userObj = {
    id: profileObj.id,
    name: profileObj.name,
    uid: profileObj.uid,
    photo_url: profileObj.photoURL,
    public_profile: profileObj.publicProfile,
    address: profileObj.address,
    neighborhood: Number(profileObj.neighborhood),
  };
  axios
    .put(`${dbUrl}/users/${userObj.id}`, userObj)
    .then(() => getSingleUserProfile(uid).then(resolve))
    .catch(reject);
});

export {
  getUserProfiles, getSingleUserProfile, createUserProfile, updateProfile,
};
