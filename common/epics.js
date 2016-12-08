import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import * as api from './api.js';
import {
  types,

  fetchProductsComplete,
  fetchProductsError,

  autoLoginNoUser,
  updateUserComplete,
  updateUserError

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


        // .map(user => {
          // if (user.id && user.accessToken) {
            // storage.setItem('userId', user.id);
            // storage.setItem('token', user.accessToken);
          // }
          // return user;
        // })
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


export default combineEpics(authEpic, productsEpic, autoLoginEpic);
