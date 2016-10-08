import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { signUp } from '../api.js';

const propTypes = {
  addUser: PropTypes.func.isRequired
};

export default class SignUp extends React.Component {
  constructor(...props) {
    super(...props);
    this.signUp = this.signUp.bind(this);
  }

  signUp(e) {
    e.preventDefault();
    const form = e.target;
    signUp(form)
      .then(this.props.addUser)
      .then(() => browserHistory.push('/'));
  }

  render() {
    return (
      <div className='auth-signup'>
        <form
          name='signup'
          onSubmit={ this.signUp }
          >
          <label>
            <input
              name='username'
              placeholder='Name'
              type='text'
            />
          </label>
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
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

SignUp.displayName = 'SignUp';
SignUp.propTypes = propTypes;
