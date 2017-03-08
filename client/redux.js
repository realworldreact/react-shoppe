const types = {
  INC: 'INC',
  DEC: 'DEC'
};
const initialState = {
  count: 0
};

export const increment = () => {
  return {
    type: types.INC
  };
};
export default (state = initialState, action) => {
  if (action.type === types.INC) {
    return Object.assign({}, state, {
      count: state.count + 1
    });
  }
  if (action.type === types.DEC) {
    return {
      ...state,
      count: state.count - 1
    };
  }
  return state;
};
