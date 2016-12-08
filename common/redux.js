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

  ADD_TO_CART: 'ADD_TO_CART',
  DELETE_FROM_CART: 'DELETE_FROM_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART: 'UPDATE_CART',
  UPDATE_CART_ERROR: 'UPDATE_CART_ERROR',

  AUTO_LOGIN: 'AUTO_LOGIN',
  AUTO_LOGIN_NO_USER: 'AUTO_LOGIN_NO_USER',

  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_COMPLETE: 'FETCH_PRODUCTS_COMPLETE',
  FETCH_PRODUCTS_ERROR: 'FETCH_PRODUCTS_ERROR',

  TOGGLE_FAV: 'TOGGLE_FAV',
  TOGGLE_FAV_ERROR: 'TOGGLE_FAV_ERROR',
  UPDATE_FAVS: 'UPDATE_FAVS',

  UPDATE_FILTER: 'UPDATE_FILTER',

  AUTH: 'AUTH',
  UPDATE_USER_COMPLETE: 'UPDATE_USER_COMPLETE',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR'
};

export const {
  auth,

  addToCart,
  deleteFromCart,
  removeFromCart,
  updateCart,
  updateCartError,

  autoLogin,
  autoLoginError,

  fetchProducts,
  fetchProductsComplete,
  fetchProductsError,

  toggleFav,
  toggleFavError,
  updateFavs,

  updateFilter,

  updateUserComplete,
  updateUserError
} = createActions.apply(null, Object.keys(types));

export const cartSelector = state => state.cart;
// state => [...Product]
export const productSelector = state => {
  return state.products.map(id => state.productsById[id]);
};

export function accessSelector(state ) {
  return {
    userId: state.user.id,
    token: state.token
  };
}

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
      favs: action.payload || []
    };
  }

  if (action.type === types.UPDATE_CART) {
    return {
      ...state,
      cart: action.payload
    };
  }

  if (action.type === types.UPDATE_PRODUCTS_FILTER) {
    return {
      ...state,
      search: action.payload
    };
  }

  if (action.type === types.FETCH_PRODUCTS_COMPLETE) {
    return {
      ...state,
      products: action.payload.map(product => product.id),
      productsById: action.payload.reduce((productsById, product) => {
        productsById[product.id] = product;
        return productsById;
      }, {})
    };
  }
  return state;
}
