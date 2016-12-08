import { ajaxGetJSON, ajaxPost } from 'rxjs/observable/dom/AjaxObservable';

import { types } from './redux.js';

const api = '/api/users';
const defaultHeaders = {
  'Content-Type': 'application/json'
};

export function getProducts() {
  return ajaxGetJSON('/api/products');
}

export function toggleFav(userId, token, itemId) {
  return ajaxPost(
    `${api}/${userId}/fav?access_token=${token}`,
    { itemId },
    defaultHeaders
  )
    .map(({ response }) => response);
}


const typesToApi = {
  [types.ADD_TO_CART]: 'add-to-cart',
  [types.REMOVE_FROM_CART]: 'remove-from-cart',
  [types.DELETE_FROM_CART]: 'delete-from-cart'
};

export function cartApi(type, id, token, itemId) {
  const cartUri = typesToApi[type];
  const uri = `${api}/${id}/${cartUri}?access_token=${token}`;
  return ajaxPost(
    uri,
    { itemId },
    defaultHeaders
  )
    .map(({ response }) => response);
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
    .map(({ response }) => response)
    .map(res => (
      // normalize server response
      isSignUp ?
        res :
        { ...res.user, accessToken: res.id }
    ));
}
