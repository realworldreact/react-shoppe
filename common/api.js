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

export const cartMethods = {
  ADD_TO_CART: 'add-to-cart',
  REMOVE_FROM_CART: 'remove-from-cart',
  DELETE_FROM_CART: 'delete-from-cart'
};
export function makeCartApiCall(type, id, token, itemId) {
  const method = cartMethods[type];
  const url = `${api}/${id}/${method}?access_token=${token}`;
  const options = {
    ...defaultOptions,
    body: JSON.stringify({ itemId })
  };
  return makeFetch(url, options);
}

makeCartApiCall.cartMethods = cartMethods;

export function fetchUser(id, token) {
  const options = {
    ...defaultOptions,
    method: 'GET'
  };
  return makeFetch(api + `/${id}?access_token=${token}`, options)
    // normalize user data
    .then(user => ({ ...user, accessToken: token }));
}

export function auth(isSignUp, form) {
  const options = {
    ...defaultOptions,
    body: serializeForm(form)
  };
  const url = isSignUp ?
    api :
    api + '/login?include=user';
  return makeFetch(url, options)
    .then(res => (
      // normalize server response
      isSignUp ?
        res :
        { ...res.user, accessToken: res.id }
    ));
}
