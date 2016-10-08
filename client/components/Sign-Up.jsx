import React, { PropTypes } from 'react';

const propTypes = {
  addUser: PropTypes.func
};

export default class SignUp extends React.Component {
  render() {
    return (
      <div className='auth-signup' />
    );
  }
}

SignUp.displayName = 'SignUp';
SignUp.propTypes = propTypes;
