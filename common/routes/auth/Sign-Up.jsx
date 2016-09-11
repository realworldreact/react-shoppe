import React, { PropTypes } from 'react';

export default class SignUp extends React.Component {
  render() {
    return (
      <div className='auth-signup'>
        <form
          action='/api/users'
          method='POST'
          name='signup'
          >
          <label>
            Email
            <input
              name='email'
              type='email'
            />
          </label>
          <label>
            password
            <input
              name='password'
              type='password'
            />
          </label>
          <button
            className='auth-signup-submit'
            type='submit'
            >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

SignUp.displayName = 'SignUp';
SignUp.propTypes = {
};
