import { createAction, handleActions } from 'redux-actions';

import * as fromApi from '../api';
import createTypes from '../../../utils/create-types';

const initialState = {
  products: []
};

export const types = createTypes(
  [
    'fetchProducts',
    'fetchProductsCompleted'
  ],
  'products'
);

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

export const productsSelector = state => ({
  products: state.productsApp.products || []
});

export default handleActions(
  {
    [types.fetchProductsCompleted]: (state, { payload = [] }) => ({
      ...state,
      products: payload
    })
  },
  initialState
);
