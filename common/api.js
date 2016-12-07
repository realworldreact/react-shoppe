import makeFetch from './utils/make-fetch.js';
import serializeForm from './utils/serialize-form.js';

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

export function fav(userId, token, itemId) {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({ itemId })
  };
  return makeFetch(
    `${api}/${userId}/fav?access_token=${token}`,
    options
  );
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

export function fetchUser(id, token) {
  const options = {
    ...defaultOptions,
    method: 'GET'
  };
  return makeFetch(api + `/${id}?access_token=${token}`, options);
}

export function signUp(form) {
  const options = {
    ...defaultOptions,
    body: serializeForm(form)
  };
  return makeFetch(api, options);
}

export function logIn(form) {
  const options = {
    ...defaultOptions,
    body: serializeForm(form)
  };
  return makeFetch(api + '/login?include=user', options)
    // normalize loopbacks response
    .then(res => ({
      ...res.user,
      accessToken: res.id
    }));
}
