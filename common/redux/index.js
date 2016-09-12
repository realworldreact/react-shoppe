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

// for now this does nothing
export default handleActions(
  {
    [addUser]: (state, { payload: user }) => ({
      ...state,
      user
    })
  },
  initialState
);
