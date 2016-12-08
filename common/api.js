import { ajaxGetJSON, ajaxPost } from 'rxjs/observable/dom/AjaxObservable';

import makeFetch from './utils/make-fetch.js';

const api = '/api/users';
const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const defaultHeaders = {
  'Content-Type': 'application/json'
};

export function getProducts() {
  return ajaxGetJSON('/api/products');
}

export function fetchProducts() {
  return makeFetch('/api/products');
}

export function toggleFav(userId, token, itemId) {
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
  return ajaxGetJSON(
    api + `/${id}?access_token=${token}`,
    defaultHeaders
  )
    // normalize user data
    .map(user => ({ ...user, accessToken: token }));
}

export function auth(isSignUp, form) {
  const url = isSignUp ?
    api :
    api + '/login?include=user';
  return ajaxPost(
    url,
    form,
    defaultHeaders
  )
    .map(res => (
      // normalize server response
      isSignUp ?
        res :
        { ...res.user, accessToken: res.id }
    ));
}
