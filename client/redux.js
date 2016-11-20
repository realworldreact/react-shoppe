const initialState = {
  search: '',
  cart: [],
  products: [],
  token: null,
  user: {},
  isSignedIn: false
};

export const types = {
  UPDATE_PRODUCTS_FILTER: 'UPDATE_PRODUCTS_FILTER',
  FETCH_PRODUCTS_COMPLETE: 'FETCH_PRODUCTS_COMPLETE'
};

export const updateFilter = e => {
  return {
    type: types.UPDATE_PRODUCTS_FILTER,
    search: e.target.value
  };
};

export function fetchProductsComplete(products) {
  return {
    type: types.FETCH_PRODUCTS_COMPLETE,
    products
  };
}


export default function reducer(state = initialState, action) {
  if (action.type === types.UPDATE_PRODUCTS_FILTER) {
    return {
      ...state,
      search: action.search
    };
  }

  if (action.type === types.FETCH_PRODUCTS_COMPLETE) {
    return {
      ...state,
      products: action.products
    };
  }
  return state;
}
