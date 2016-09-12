import * as fromApi from '../api';
import { addUser } from '../../../redux';
import createTypes from '../../../utils/create-types';

export const types = createTypes(
  [
    'signUp',
    'loginIn'
  ],
  'auth'
);

export const signUp = e => dispatch => {
  e.preventDefault();
  const form = e.target;
  return dispatch({
    type: types.signUp,
    payload: Promise.resolve()
  })
    .then(() => fromApi.signUp(form))
    .then(addUser)
    .then(dispatch)
    .then(null);
};
