import { createAction, handleActions } from 'redux-actions';
import createTypes from '../utils/create-types';

const initialState = {
  user: null
};

export const types = createTypes(
  [
    'addUser'
  ],
  'app'
);

export const addUser = createAction(types.addUser);

export const userSelector = state => ({ user: state.app.user || {} });
export const cartSelector = state => ({ cart: state.app.cart || [] });

export default handleActions(
  {
    [addUser]: (state, { payload: user = {} }) => ({
      ...state,
      user,
      cart: user.cart
    })
  },
  initialState
);
