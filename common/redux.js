import { Observable } from 'rxjs';
import { browserHistory as history } from 'react-router';
import * as api from './api.js';

const initialState = {
  search: '',
  cart: [],
  products: [],
  productsById: {},
  token: null,
  user: {},
  isSignedIn: false
};


export const types = {
  UPDATE_PRODUCTS_FILTER: 'UPDATE_PRODUCTS_FILTER',
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_COMPLETE: 'FETCH_PRODUCTS_COMPLETE',
  FETCH_PRODUCTS_ERROR: 'FETCH_PRODUCTS_ERROR',
  AUTO_LOGIN: 'AUTO_LOGIN',
  AUTO_LOGIN_NO_USER: 'AUTO_LOGIN_NO_USER',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_COMPLETE: 'UPDATE_USER_COMPLETE',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_CART: 'UPDATE_CART'
};

export const updateFilter = e => {
  return {
    type: types.UPDATE_PRODUCTS_FILTER,
    search: e.target.value
  };
};


export const fetchProductsEpic = (actions) => {
  return actions.ofType(types.FETCH_PRODUCTS)
    .switchMap(() => {
      return Observable.fromPromise(api.fetchProducts())
        .map(products => fetchProductsComplete(products))
        .catch(err => Observable.of({
          type: types.FETCH_PRODUCTS_ERROR,
          payload: err
        }));
    });
};

export const fetchProducts = () => ({
  type: types.FETCH_PRODUCTS
});
// export function fetchProducts() {
//   return dispatch => {
//     dispatch({ type: types.FETCH_PRODUCTS });
//     api.fetchProducts()
//       .then(products => dispatch(fetchProductsComplete(products)))
//       .catch(err => dispatch({
//         type: types.FETCH_PRODUCTS_ERROR,
//         error: true,
//         payload: err
//       }));
//   };
// }

export function fetchProductsComplete(products) {
  return {
    type: types.FETCH_PRODUCTS_COMPLETE,
    products
  };
}


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

export function autoLogin() {
  return (dispatch, getState, { storage }) => {
    dispatch({ type: types.AUTO_LOGIN });
    if (!storage.userId || !storage.token) {
      return dispatch({ type: types.AUTO_LOGIN_NO_USER });
    }
    return api.fetchUser(storage.userId, storage.token)
      .then(user => dispatch({
        type: types.UPDATE_USER_COMPLETE,
        user
      }))
      .catch(err => {
        delete storage.userId;
        delete storage.token;
        dispatch({
          type: types.UPDATE_USER_ERROR,
          error: true,
          payload: err
        });
    });
  };
}

export const addToCartEpic = (actions, { getState }) => {
  return actions.ofType(types.ADD_TO_CART)
    .filter(() => {
      const { user: { id }, token } = getState();
      return id && token;
    })
    .switchMap(({ itemId }) => {
      const { user: { id }, token } = getState();
      return Observable.fromPromise(api.addToCart(id, token, itemId))
        .map(({ cart }) => ({
          type: types.UPDATE_CART,
          cart
        }))
        .catch(() => Observable.create({ type: 'ERROR_IN_CART' }));
    });
};

export function addToCart(itemId) {
  return {
    type: types.ADD_TO_CART,
    itemId
  };
}
// export function addToCart(itemId) {
//   return function(dispatch, getState) {
//     const {
//       user: { id },
//       token
//     } = getState();

//     if (id && token) {
//       api.addToCart(id, token, itemId)
//         .then(({ cart }) => dispatch({
//           type: types.UPDATE_CART,
//           cart
//         }));
//     }
//   };
// }

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
      products: action.products.map(product => product.id),
      productsById: action.products.reduce((productsById, product) => {
        productsById[product.id] = product;
        return productsById;
      }, {})
    };
  }
  return state;
}
