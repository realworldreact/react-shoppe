import { createAction, handleActions } from 'redux-actions';
import createTypes from '../utils/create-types';
import * as fromApi from '../api';

const initialState = {
  user: null,
  products: [],
  cart: []
};

export const types = createTypes(
  [
    'addUser',
    'fetchProducts',
    'fetchProductsCompleted'
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
    .then(() => fromApi.fetchProducts())
    .then(fetchProductsCompleted)
    .then(dispatch);
};

export const userSelector = state => ({ user: state.app.user || {} });
export const cartSelector = state => ({ cart: state.app.cart || [] });
export const productsSelector = state => ({
  products: state.app.products || []
});

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
    })
  },
  initialState
);
