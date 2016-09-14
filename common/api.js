import makeFetch from './utils/make-fetch';

const api = '/api/users';
const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};
export function fetchProducts() {
  return makeFetch('/api/products');
}

export function addToCart(userId, token, itemId) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({ itemId })
  };
  return makeFetch(
    `${api}/${userId}/add-to-cart?access_token=${token}`,
    options
  );
}

export function removeFromCart(userId, token, itemId) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({ itemId })
  };
  return makeFetch(
    `${api}/${userId}/remove-from-cart?access_token=${token}`,
    options
  );
}

export function deleteFromCart(userId, token, itemId) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({ itemId })
  };
  return makeFetch(
    `${api}/${userId}/delete-from-cart?access_token=${token}`,
    options
  );
}
