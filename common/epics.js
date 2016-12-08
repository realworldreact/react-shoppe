// add all operators to observable class
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import {
  ajaxGetJSON,
  ajaxPost
} from 'rxjs/observable/dom/AjaxObservable';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import {
  types,

  updateCart,
  updateCartError,

  fetchProductsComplete,
  fetchProductsError,

  toggleFavError,
  updateFavs,

  updateUserComplete,
  updateUserError,

  accessSelector
} from './redux.js';


const api = '/api/users';
const defaultHeaders = {
  'Content-Type': 'application/json'
};

export function productsEpic(actions, _, { fetcher }) {
  return actions.ofType(types.FETCH_PRODUCTS)
    .switchMap(() => (
      Observable.fromPromise(fetcher.read('products').end())
        .map(({ data }) => data)
        .map(fetchProductsComplete)
        .catch(err => [fetchProductsError(err)])
    ));
}

export function userStorageEpic(actions, _, { storage }) {
  return actions.ofType(types.UPDATE_USER_COMPLETE)
    .do(({ payload: user }) => {
      if (user.id && user.accessToken) {
        storage.setItem('userId', user.id);
        storage.setItem('token', user.accessToken);
      }
    })
    .ignoreElements();
}

export function autoLoginEpic(actions, store, { storage }) {
  return actions.ofType(types.AUTO_LOGIN)
    .switchMap(() => {
      if (!storage.userId || !storage.token) {
        return Observable.of({ type: types.AUTO_LOGIN_NO_USER });
      }
      return ajaxGetJSON(
        api + `/${storage.userId}?access_token=${storage.token}`,
      )
        .map(user => ({ ...user, accessToken: storage.token }))
        .map(updateUserComplete)
        .catch(err => [updateUserError(err)]);
    });
}

export function authEpic(actions) {
  return actions.ofType(types.AUTH)
    .switchMap(({ payload: { isSignUp, form } }) => (
      ajaxPost(
        api + (isSignUp ? '' : '/login?include=user'),
        form,
        defaultHeaders
      )
        .map(({ response }) => response)
        .map(res => isSignUp ? res : { ...res.user, accessToken: res.id })
        .map(updateUserComplete)
        .mergeMap(updateUserAction => Observable.of(
          updateUserAction,
          push('/')
        ))
        .catch(err => [updateUserError(err)])
    ));
}

export function toggleFavEpic(actions, { getState }) {
  return actions.ofType(types.TOGGLE_FAV)
    .switchMap(({ payload: itemId }) => {
      const {
        userId,
        token
      } = accessSelector(getState());
      if (!userId || !token) {
        return null;
      }
      return ajaxPost(
        `${api}/${userId}/fav?access_token=${token}`,
        { itemId },
        defaultHeaders
      )
        .map(({ response: { favs } }) => favs)
        .map(updateFavs)
        .catch(err => [toggleFavError(err)]);
    });
}

const cartApis = {
  [types.ADD_TO_CART]: 'add-to-cart',
  [types.REMOVE_FROM_CART]: 'remove-from-cart',
  [types.DELETE_FROM_CART]: 'delete-from-cart'
};

export function cartEpic(actions, { getState }) {
  return actions.ofType(
    types.ADD_TO_CART,
    types.REMOVE_FROM_CART,
    types.DELETE_FROM_CART
  )
    .switchMap(({ type, payload: itemId }) => {
      const { userId, token } = accessSelector(getState());
      const uri = `${api}/${userId}/${cartApis[type]}/?access_token=${token}`;
      return ajaxPost(
        uri,
        { itemId },
        defaultHeaders
      )
        .map(({ response: { cart } }) => cart)
        .map(updateCart)
        .catch(err => [updateCartError(err)]);
    });
}

export default combineEpics(
  productsEpic,
  authEpic,
  autoLoginEpic,
  userStorageEpic,
  toggleFavEpic,
  cartEpic
);
