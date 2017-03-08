const types = {

  UPDATE_SEARCH: 'UPDATE_SEARCH'
};
const initialState = {
  search: ''
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
export default (state = initialState, action) => {
  if (action.type === types.UPDATE_SEARCH) {
    return {
      ...state,
      search: action.payload || ''
    };
  }
  return state;
};
