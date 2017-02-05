import * as api from './api.js';

const initialState = {
  user: {},
  products: [],
  accessToken: null,
  cart: [],
  favs: [],
  filter: ''
};

export const types = {
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_CART: 'UPDATE_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  DELETE_FROM_CART: 'DELETE_FROM_CART',
  FAVORITING: 'FAVORITING',
  UPDATE_FAVS: 'UPDATE_FAVS'
};

export const updateFilter = (filter) => {
  return {
    type: types.UPDATE_FILTER,
    payload: filter
  };
};

export const updateUser = (user) => {
  return (dispatch, getState, { localStorage }) => {
    if (user.id && user.accessToken) {
      localStorage.setItem('id', user.id);
      localStorage.setItem('accessToken', user.accessToken);
    }

    dispatch({
      type: types.UPDATE_USER,
      payload: {
        user,
        accessToken: user.accessToken,
        id: user.id,
        cart: user.cart,
        favs: user.favs
      }
    });
  };
};

export const addToFav = (itemId) => {
  return (dispatch, getState) => {
    const { user, accessToken } = getState();
    if (!user.id || !accessToken) {
      return null;
    }
    dispatch({
      type: types.FAVORITING
    });
    return api.fav(user.id, accessToken, itemId)
      .then(({ favs }) => dispatch({
        type: types.UPDATE_FAVS,
        payload: favs
      }));
  };
};
export const addToCart = (itemId) => {
  return (dispatch, getState) => {
    const { user, accessToken } = getState();
    if (!user.id || !accessToken) {
      return null;
    }
    dispatch({
      type: 'ABOUT_TO_ADD_TO_CART'
    });
    return api.addToCart(user.id, accessToken, itemId)
      .then(({ cart }) => dispatch({ type: types.UPDATE_CART, payload: cart }));
  };
};

export const removeFromCart = (itemId) => {
  return (dispatch, getState) => {
    const { user, accessToken } = getState();
    if (!user.id || !accessToken) {
      return null;
    }
    dispatch({ type: types.REMOVE_FROM_CART });
    return api.removeFromCart(user.id, accessToken, itemId)
      .then(({ cart }) => dispatch({
        type: types.UPDATE_CART,
        payload: cart
      }));
  };
};

export const deleteFromCart = (itemId) => {
  return (dispatch, getState) => {
    const { user, accessToken } = getState();
    if (!user.id || !accessToken) {
      return null;
    }
    dispatch({ type: types.DELETE_FROM_CART });
    return api.deleteFromCart(user.id, accessToken, itemId)
      .then(({ cart }) => dispatch({
        type: types.UPDATE_CART,
        payload: cart
      }));
  };
};

export const updateProducts = (products) => {
  return {
    type: types.UPDATE_PRODUCTS,
    payload: products
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    api.fetchProducts()
      .then(
        products => dispatch(updateProducts(products))
      );
  };
};

export const fetchUser = () => {
  return (dispatch, getState, { localStorage }) => {
    const id = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    if (id && accessToken) {
      api.fetchUser(id, accessToken)
        .then(user => {
          dispatch(updateUser({ ...user, accessToken }));
        });
    }
  };
};

export default function reducer(state = initialState, action) {
  if (action.type === types.UPDATE_FILTER) {
    return Object.assign({}, state, { filter: action.payload });
  }
  if (action.type === types.UPDATE_USER) {
    return Object.assign({}, state, action.payload);
  }
  if (action.type === types.UPDATE_PRODUCTS) {
    return {
      ...state,
      products: action.payload
    };
  }
  if (action.type === types.UPDATE_CART) {
    return {
      ...state,
      cart: action.payload
    };
  }

  if (action.type === types.UPDATE_FAVS) {
    return {
      ...state,
      favs: action.payload
    };
  }
  return state;
}
