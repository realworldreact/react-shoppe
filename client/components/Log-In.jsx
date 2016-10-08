import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { logIn } from '../api.js';

const propTypes = {
  addUser: PropTypes.func
};

export default class LogIn extends React.Component {
  constructor(...props) {
    super(...props);
    this.logIn = this.logIn.bind(this);
  }

  logIn(e) {
    e.preventDefault();
    const form = e.target;
    logIn(form)
      .then(this.props.addUser)
      .then(() => browserHistory.push('/cart'));
  }

  render() {
    return (
      <div className='auth-login'>
        <form
          name='login'
          onSubmit={ this.logIn }
          >
          <label>
            <input
              name='email'
              placeholder='Email'
              type='email'
            />
          </label>
          <label>
            <input
              name='password'
              placeholder='Password'
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
LogIn.propTypes = propTypes;
