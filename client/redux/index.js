import { createAction } from 'redux-actions';

import createTypes from '../utils/create-types';
import * as api from '../api';

export const userSelector = state => ({ user: state.app.user || {} });
export const cartSelector = state => ({ cart: state.app.cart || [] });
export const productsSelector = state => ({
  products: state.app.products || []
});
export const favsSelector = state => ({ favs: state.app.favs || [] });

export const types = createTypes(
  [
    'removeItemFromCart',
    'removeItemCompleted',

    'deleteItemFromCart',
    'deleteItemCompleted'
  ],
  'app'
);

export const addItemCompleted = createAction(types.addItemCompleted);
export const addItemToCart = itemId => (dispatch, getState) => {
  const { user } = userSelector(getState());
  if (!user.id || !user.accessToken || !itemId) {
    return null;
  }
  dispatch({ type: types.addItemToCart });
  api.addToCart(user.id, user.accessToken, itemId)
    .then(addItemCompleted)
    .then(dispatch);
  return null;
};

export const removeItemCompleted = createAction(types.removeItemCompleted);
export const removeItemFromCart = itemId => (dispatch, getState) => {
  const { user } = userSelector(getState());
  if (!user.id || !user.accessToken || !itemId) {
    return null;
  }
  dispatch({ type: types.removeItemFromCart });
  api.removeFromCart(user.id, user.accessToken, itemId)
    .then(removeItemCompleted)
    .then(dispatch);
  return null;
};

export const deleteItemCompleted = createAction(types.deleteItemCompleted);
export const deleteItemFromCart = itemId => (dispatch, getState) => {
  const { user } = userSelector(getState());
  if (!user.id || !user.accessToken || !itemId) {
    return null;
  }
  dispatch({ type: types.deleteItemFromCart });
  api.deleteFromCart(user.id, user.accessToken, itemId)
    .then(deleteItemCompleted)
    .then(dispatch);
  return null;
};
