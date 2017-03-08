const types = {
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  UPDATE_SEARCH: 'UPDATE_SEARCH'
};
const initialState = {
  search: '',
  products: []
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
  return state;
};
