import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { signUp } from '../redux';

const actions = {
  signUp
};
const propTypes = {
  signUp: PropTypes.func.isRequired
};

export class SignUp extends React.Component {
  render() {
    const { signUp } = this.props;
    return (
      <div className='auth-signup'>
        <form
          name='signup'
          onSubmit={ signUp }
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

export default connect(
  null,
  actions
)(SignUp);
