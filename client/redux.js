import * as api from './api.js';

const types = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_PRODUCT_ERROR: 'FETCH_PRODUCT_ERROR',
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  UPDATE_SEARCH: 'UPDATE_SEARCH',
  FETCH_USER: 'FETCH_USER',
  FETCH_USER_ERROR: 'FETCH_USER_ERROR',
  UPDATE_USER: 'UPDATE_USER',

  UPDATE_CART: 'UPDATE_CART',
  UPDATE_FAV: 'UPDATE_FAV'
};
const initialState = {
  search: '',
  products: [],
  user: {},
  cart: [],
  favs: [],
  token: null,
  isSignedIn: false
};
// const action = {
//   type,
//   payload
// };
export const updateSearch = (search) => {
  return {
    type: types.UPDATE_SEARCH,
    payload: search
  };
};

export const updateProducts = products => {
  return {
    type: types.UPDATE_PRODUCTS,
    payload: products
  };
};

export const updateUser = user => {
  return {
    type: types.UPDATE_USER,
    payload: user
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({ type: types.FETCH_PRODUCTS });
    api.fetchProducts()
      .then(products => {
        return dispatch(updateProducts(products));
      })
      .catch(err => {
        dispatch({ type: types.FETCH_PRODUCT_ERROR, payload: err });
      });
  };
};

export const fetchUser = () => {
  return (dispatch, getState, { localStorage }) => {
    const id = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    if (id && accessToken) {
      dispatch({ type: types.FETCH_USER });
      api.fetchUser(id, accessToken)
        .then(
          user => {
            dispatch(updateUser({ ...user, accessToken }));
          },
          (err) => {
            dispatch({ type: types.FETCH_USER, payload: err });
          }
        );
    }
  };
};

export const addToCart = (itemId) => {
  return (dispatch, getState) => {
    const { token, user } = getState();
    if (!user.id || !token) {
      return null;
    }
    return api.addToCart(user.id, token, itemId)
      .then(({ cart }) => dispatch({
        type: types.UPDATE_CART,
        payload: cart
      }));
  };
};

export const removeFromCart = (itemId) => {
  return (dispatch, getState) => {
    const { token, user } = getState();
    if (!user.id || !token) {
      return null;
    }
    return api.removeFromCart(user.id, token, itemId)
      .then(({ cart }) => dispatch({
        type: types.UPDATE_CART,
        payload: cart
      }));
  };
};

export const deleteFromCart = (itemId) => {
  return (dispatch, getState) => {
    const { token, user } = getState();
    if (!user.id || !token) {
      return null;
    }
    return api.deleteFromCart(user.id, token, itemId)
      .then(({ cart }) => dispatch({
        type: types.UPDATE_CART,
        payload: cart
      }));
  };
};

export const addToFavs = (itemId) => {
  return (dispatch, getState) => {
    const { token, user } = getState();
    if (!user.id || !token) {
      return null;
    }
    return api.fav(user.id, token, itemId)
      .then(({ favs }) => dispatch({
        type: types.UPDATE_FAV,
        payload: favs
      }));
  };
};

export default (state = initialState, action) => {
  if (action.type === types.UPDATE_SEARCH) {
    return {
      ...state,
      search: action.payload || ''
    };
  }
  if (action.type === types.UPDATE_PRODUCTS) {
    return {
      ...state,
      products: action.payload
    };
  }
  if (action.type === types.UPDATE_USER) {
    const user = action.payload;
    return {
      ...state,
      user,
      cart: user.cart || [],
      favs: user.favs || [],
      token: user.accessToken,
      isSignedIn: !!user.username
    };
  }

  if (action.type === types.UPDATE_CART) {
    return {
      ...state,
      cart: action.payload || []
    };
  }

  if (action.type === types.UPDATE_FAV) {
    return {
      ...state,
      favs: action.payload || []
    };
  }
  return state;
};
