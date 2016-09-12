import { push } from 'react-router-redux';

import * as fromApi from '../api';
import { addUser } from '../../../redux';
import createTypes from '../../../utils/create-types';

export const types = createTypes(
  [
    'signUp',
    'logIn'
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
    .then(addUserAction => {
      dispatch(addUserAction);
      dispatch(push('/cart'));
    });
};

export const logIn = e => dispatch => {
  e.preventDefault();
  const form = e.target;
  return dispatch({
    type: types.logIn,
    payload: Promise.resolve()
  })
    .then(() => fromApi.logIn(form))
    .then(addUser)
    .then(addUserAction => {
      dispatch(addUserAction);
      dispatch(push('/cart'));
    });
};
