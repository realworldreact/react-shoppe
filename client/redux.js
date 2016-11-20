import { browserHistory as history } from 'react-router';
import * as api from './api.js';

const initialState = {
  search: '',
  cart: [],
  products: [],
  token: null,
  user: {},
  isSignedIn: false
};


export const types = {
  UPDATE_PRODUCTS_FILTER: 'UPDATE_PRODUCTS_FILTER',
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_COMPLETE: 'FETCH_PRODUCTS_COMPLETE',
  FETCH_PRODUCTS_ERROR: 'FETCH_PRODUCTS_ERROR',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_COMPLETE: 'UPDATE_USER_COMPLETE',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
  UPDATE_CART: 'UPDATE_CART'
};

export const updateFilter = e => {
  return {
    type: types.UPDATE_PRODUCTS_FILTER,
    search: e.target.value
  };
};

export function fetchProducts() {
  return dispatch => {
    dispatch({ type: types.FETCH_PRODUCTS });
    api.fetchProducts()
      .then(products => dispatch(fetchProductsComplete(products)))
      .catch(err => dispatch({ type: types.FETCH_PRODUCTS_ERROR, err }));
  };
}

export function fetchProductsComplete(products) {
  return {
    type: types.FETCH_PRODUCTS_COMPLETE,
    products
  };
}


export function signUp(e) {
  e.preventDefault();
  return dispatch => {
    dispatch({ type: types.UPDATE_USER });
    api.signUp(e.target)
      .then(user => dispatch({
        type: types.UPDATE_USER_COMPLETE,
        user
      }))
      .then(() => {
        history.push('/');
      })
      .catch(err => dispatch({
        type: types.UPDATE_USER_ERROR,
        err
      }));
  };
}

export function logIn(e) {
  e.preventDefault();
  return dispatch => {
    dispatch({ type: types.UPDATE_USER });
    api.logIn(e.target)
      .then(user => dispatch({
        type: types.UPDATE_USER_COMPLETE,
        user
      }))
      .then(() => {
        history.push('/');
      })
      .catch(err => dispatch({
        type: types.UPDATE_USER_ERROR,
        err
      }));
  };
}

export function addToCart(itemId) {
  return function(dispatch, getState) {
    const {
      user: { id },
      token
    } = getState();

    if (id && token) {
      api.addToCart(id, token, itemId)
        .then(({ cart }) => dispatch({
          type: types.UPDATE_CART,
          cart
        }));
    }
  };
}

export function removeFromCart(itemId) {
  return function(dispatch, getState) {
    const {
      user: { id },
      token
    } = getState();

    if (id && token) {
      api.removeFromCart(id, token, itemId)
        .then(({ cart }) => dispatch({
          type: types.UPDATE_CART,
          cart
        }));
    }
  };
}

export function deleteFromCart(itemId) {
  return function(dispatch, getState) {
    const {
      user: { id },
      token
    } = getState();

    if (id && token) {
      api.deleteFromCart(id, token, itemId)
        .then(({ cart }) => dispatch({
          type: types.UPDATE_CART,
          cart
        }));
    }
  };
}

export default function reducer(state = initialState, action) {
  if (action.type === types.UPDATE_USER_COMPLETE) {
    const { user } = action;
    return {
      ...state,
      user,
      cart: user.cart || [],
      token: user.accessToken,
      isSignedIn: !!user.username
    };
  }

  if (action.type === types.UPDATE_CART) {
    return {
      ...state,
      cart: action.cart
    };
  }

  if (action.type === types.UPDATE_PRODUCTS_FILTER) {
    return {
      ...state,
      search: action.search
    };
  }

  if (action.type === types.FETCH_PRODUCTS_COMPLETE) {
    return {
      ...state,
      products: action.products
    };
  }
  return state;
}
