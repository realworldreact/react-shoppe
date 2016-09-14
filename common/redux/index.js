import { combineActions, createAction, handleActions } from 'redux-actions';
import createTypes from '../utils/create-types';
import * as api from '../api';

const initialState = {
  user: null,
  products: [],
  cart: []
};

export const userSelector = state => ({ user: state.app.user || {} });
export const cartSelector = state => ({ cart: state.app.cart || [] });
export const productsSelector = state => ({
  products: state.app.products || []
});

export const types = createTypes(
  [
    'addUser',
    'fetchProducts',
    'fetchProductsCompleted',
    'addItemToCart',
    'addItemCompleted',

    'removeItemFromCart',
    'removeItemCompleted',

    'deleteItemFromCart',
    'deleteItemCompleted'
  ],
  'app'
);

export const addUser = createAction(types.addUser);

export const fetchProductsCompleted = createAction(
  types.fetchProductsCompleted
);

export const fetchProducts = () => dispatch => {
  return dispatch({
    type: types.fetchProducts,
    payload: Promise.resolve(null)
  })
    .then(() => api.fetchProducts())
    .then(fetchProductsCompleted)
    .then(dispatch);
};

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

const updateCartActions = combineActions(
  types.addItemCompleted,
  types.removeItemCompleted,
  types.deleteItemCompleted
);
export default handleActions(
  {
    [types.addUser]: (state, { payload: user = {} }) => ({
      ...state,
      user,
      cart: user.cart
    }),
    [types.fetchProductsCompleted]: (state, { payload = [] }) => ({
      ...state,
      products: payload
    }),
    [updateCartActions]: (state, { payload: { cart } }) => ({
      ...state,
      cart
    })
  },
  initialState
);
