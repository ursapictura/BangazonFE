import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getClosedOrders = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/${userId}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getCart = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getClosedOrders, getCart, getSingleOrder,
};
