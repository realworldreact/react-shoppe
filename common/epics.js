import { Observable } from 'rxjs/Observable.js';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import * as api from './api.js';
import {
  types,

  fetchProductsComplete,
  fetchProductsError,

  autoLoginNoUser,
  updateUserComplete,
  updateUserError,

  updateCart,
  updateCartError,

  updateFavs,
  updateFavsError
} from './redux.js';

export function productsEpic(actions) {
  return actions.ofType(types.FETCH_PRODUCTS)
    .switchMap(() => {
      return api.getProducts()
        .map(products => fetchProductsComplete(products))
        .catch(err => [fetchProductsError(err)]);
    });
}

export function autoLoginEpic(actions, { getState }, { storage }) {
  return actions.ofType(types.AUTO_LOGIN)
    .switchMap(() => {
      if (!storage.userId || !storage.token) {
        return [autoLoginNoUser()];
      }
      return api.fetchUser(storage.userId, storage.token)
        .map(user => updateUserComplete(user))
        .catch(err => [updateUserError(err)]);
    });
}


export function storeUserEpic(actions, _, { storage }) {
  return actions.ofType(types.UPDATE_USER_COMPLETE)
    .do(({ payload: user })=> {
      if (user.id && user.accessToken) {
        storage.setItem('userId', user.id);
        storage.setItem('token', user.accessToken);
      }
    })
    .ignoreElements();
}

export function authEpic(actions) {
  return actions.ofType(types.AUTH)
    .switchMap(({ payload: { isSignUp, form }}) => {
      return api.auth(isSignUp, form)
        .mergeMap(user => {
          return [
            updateUserComplete(user),
            push('/')
          ];
        })
        .catch(err => [updateUserError(err)]);
    });
}

export function cartEpic(actions, { getState }) {
  return actions.ofType(
    types.ADD_TO_CART,
    types.REMOVE_FROM_CART,
    types.DELETE_FROM_CART
  )
    .switchMap(({ type, payload: itemId }) => {
      const {
        user: { id },
        token
      } = getState();
      if (!id || !token) {
        return Observable.empty();
      }
      return api.cartApi(type, id, token, itemId)
        .map(({ cart }) => updateCart(cart))
        .catch(err => [updateCartError(err)]);
    });
}


export function favEpic(actions, { getState }) {
  return actions.ofType(types.TOGGLE_FAV)
    .switchMap(({ payload: itemId }) => {
      const {
        user: { id },
        token
      } = getState();
      if (!id || !token) {
        return Observable.empty();
      }
      return api.toggleFav(id, token, itemId)
        .map(({ favs }) => updateFavs(favs))
        .catch(err => [updateFavsError(err)]);
    });
}

export default combineEpics(
  authEpic,
  productsEpic,
  autoLoginEpic,
  storeUserEpic,
  cartEpic,
  favEpic
);
