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

  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  DELETE_FROM_CART: 'DELETE_FROM_CART',
  UPDATE_CART: 'UPDATE_CART',
  UPDATE_CART_ERROR: 'UPDATE_CART_ERROR'
};

export const {
  fetchProducts,
  fetchProductsComplete,
  fetchProductsError,

  auth,
  autoLogin,
  autoLoginNoUser,
  updateUserComplete,
  updateUserError,

  addToCart,
  removeFromCart,
  deleteFromCart,
  updateCart,
  updateCartError,

  toggleFav,
  updateFavs,
  updateFavsError
} = createActions(
  ...Object.keys(types)
);

export const updateFilter = e => {
  return {
    type: types.UPDATE_PRODUCTS_FILTER,
    search: e.target.value
  };
};

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
