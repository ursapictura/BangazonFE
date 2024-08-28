import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaiton/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getProductsByCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/category/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaiton/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export { getCategories, getProductsByCategory };
