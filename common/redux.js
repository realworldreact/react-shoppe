// import { browserHistory as history } from 'react-router';
import * as api from './api.js';
import { createActions } from 'redux-actions';

const initialState = {
  search: '',
  cart: [],
  favs: [],
  products: [],
  productsById: {},
  token: null,
  user: {},
  isSignedIn: false
};

export const types = {
  AUTH: 'AUTH',
  UPDATE_PRODUCTS_FILTER: 'UPDATE_PRODUCTS_FILTER',
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_COMPLETE: 'FETCH_PRODUCTS_COMPLETE',
  FETCH_PRODUCTS_ERROR: 'FETCH_PRODUCTS_ERROR',
  AUTO_LOGIN: 'AUTO_LOGIN',
  AUTO_LOGIN_NO_USER: 'AUTO_LOGIN_NO_USER',
  TOGGLE_FAV: 'TOGGLE_FAV',
  TOGGLE_FAV_ERROR: 'TOGGLE_FAV_ERROR',
  UPDATE_FAVS: 'UPDATE_FAVS',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_COMPLETE: 'UPDATE_USER_COMPLETE',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
  UPDATE_CART: 'UPDATE_CART'
};

export const {
  fetchProducts,
  fetchProductsComplete,
  fetchProductsError,

  auth,
  autoLogin,
  autoLoginNoUser,
  updateUserComplete,
  updateUserError
} = createActions(
  ...Object.keys(types)
);

export const updateFilter = e => {
  return {
    type: types.UPDATE_PRODUCTS_FILTER,
    search: e.target.value
  };
};

/*
export function auth(isSignUp, e) {
  e.preventDefault();
  return (dispatch, getState, { storage }) => {
    dispatch({ type: types.UPDATE_USER });
    api.auth(isSignUp, e.target)
      .then(user => {
        if (user.id && user.accessToken) {
          storage.setItem('userId', user.id);
          storage.setItem('token', user.accessToken);
        }
        return user;
      })
      .then(user => dispatch({
        type: types.UPDATE_USER_COMPLETE,
        user
      }))
      .then(() => {
        history.push('/');
      })
      .catch(err => dispatch({
        type: types.UPDATE_USER_ERROR,
        error: true,
        payload: err
      }));
  };
}
*/

export function toggleFav(itemId) {
  return (dispatch, getState) => {
    const {
      user: { id },
      token
    } = getState();
    if (!id || !token) {
      return null;
    }
    return api.toggleFav(id, token, itemId)
      .then(({ favs }) => dispatch({
        type: types.UPDATE_FAVS,
        favs
      }))
      .catch(err => dispatch({
        type: types.TOGGLE_FAV_ERROR,
        error: true,
        payload: err
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


export const cartSelector = state => state.cart;
// state => [...Product]
export const productSelector = state => {
  return state.products.map(id => state.productsById[id]);
};

export default function reducer(state = initialState, action) {
  if (action.type === types.UPDATE_USER_COMPLETE) {
    const { payload: user } = action;
    return {
      ...state,
      user,
      cart: user.cart || [],
      favs: user.favs || [],
      token: user.accessToken,
      isSignedIn: !!user.username
    };
  }

  if (action.type === types.UPDATE_FAVS) {
    return {
      ...state,
      favs: action.favs || []
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
    const { payload: products } = action;
    return {
      ...state,
      products: products.map(product => product.id),
      productsById: products.reduce((productsById, product) => {
        productsById[product.id] = product;
        return productsById;
      }, {})
    };
  }
  return state;
}
