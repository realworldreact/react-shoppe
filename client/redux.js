const types = {
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  UPDATE_SEARCH: 'UPDATE_SEARCH',
  UPDATE_USER: 'UPDATE_USER'
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
  return state;
};
