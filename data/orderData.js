import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getClosedOrders = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/${userId}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getCart = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/cart/${userId}`, {
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
  fetch(`${endpoint}/api/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const checkoutOrder = (cartId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/${cartId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getClosedOrders, getCart, getSingleOrder, checkoutOrder,
};
