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

// export function addToCart(userId, token, itemId) {
//   const options = {
//     ...defaultOptions,
//     body: JSON.stringify({ itemId })
//   };
//   return makeFetch(
//     `${api}/${userId}/add-to-cart?access_token=${token}`,
//     options
//   );
// }

// export function removeFromCart(userId, token, itemId) {
//   const options = {
//     ...defaultOptions,
//     body: JSON.stringify({ itemId })
//   };
//   return makeFetch(
//     `${api}/${userId}/remove-from-cart?access_token=${token}`,
//     options
//   );
// }

// export function deleteFromCart(userId, token, itemId) {
//   const options = {
//     ...defaultOptions,
//     body: JSON.stringify({ itemId })
//   };
//   return makeFetch(
//     `${api}/${userId}/delete-from-cart?access_token=${token}`,
//     options
//   );
// }

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
