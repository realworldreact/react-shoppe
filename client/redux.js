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
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS'
};

export const updateFilter = (filter) => {
  return {
    type: types.UPDATE_FILTER,
    payload: filter
  };
};

export const updateUser = (user) => {
  return {
    type: types.UPDATE_USER,
    payload: {
      user,
      accessToken: user.accessToken,
      id: user.id,
      cart: user.cart,
      favs: user.favs
    }
  };
};

export const updateProducts = (products) => {
  return {
    type: types.UPDATE_PRODUCTS,
    payload: products
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
  return state;
}
