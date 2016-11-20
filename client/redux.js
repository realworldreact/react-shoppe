const initialState = {
  search: '',
  cart: [],
  products: [],
  token: null,
  user: {},
  isSignedIn: false
};

export const types = {
  UPDATE_PRODUCTS_FILTER: 'UPDATE_PRODUCTS_FILTER'
};

export const updateFilter = e => {
  return {
    type: types.UPDATE_PRODUCTS_FILTER,
    search: e.target.value
  };
};


export default function reducer(state = initialState, action) {
  if (action.type === types.UPDATE_PRODUCTS_FILTER) {
    return {
      ...state,
      search: action.search
    };
  }
  return state;
}
