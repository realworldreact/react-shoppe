import React, { PropTypes } from 'react';

const propTypes = {
  addUser: PropTypes.func
};

export default class LogIn extends React.Component {
  render() {
    return (
      <div className='auth-login' />
    );
  }
}

LogIn.displayName = 'LogIn';
LogIn.propTypes = propTypes;
