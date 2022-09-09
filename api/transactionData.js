import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTransactions = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/transaction.json`)
    .then((response) => {
      if (response) {
        resolve((Object.values(response.data)));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createTransaction = (transactObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/transaction.json`, transactObj)
    .then((response) => {
      const payload = { transactionFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/transaction/${payload.transactionFirebaseKey}.json`, payload).then(resolve);
    })
    .catch(reject);
});

export { getTransactions, createTransaction };
