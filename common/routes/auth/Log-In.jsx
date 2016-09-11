import React, { PropTypes } from 'react';

export default class LogIn extends React.Component {
  render() {
    return (
      <div className='auth-login'>
        <form
          action='/api/users/login'
          method='POST'
          name='login'
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
            Log In
          </button>
        </form>
      </div>
    );
  }
}

LogIn.displayName = 'LogIn';
LogIn.propTypes = {
};
