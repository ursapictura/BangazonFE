import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getNew20 = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/newest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// Create Seller Storefront
const getSellerProducts = (sellerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/users/${sellerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addToCart = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/addProduct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json)
    .then((data) => resolve(data))
    .catch(reject);
});

const removeFromCart = (productId, orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/${orderId}/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllProducts,
  getNew20,
  getSingleProduct,
  getSellerProducts,
  addToCart,
  removeFromCart,
};
