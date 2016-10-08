import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { logIn } from '../redux';

const actions = {
  logIn
};

const propTypes = {
  logIn: PropTypes.func.isRequired
};

export class LogIn extends React.Component {
  render() {
    const { logIn } = this.props;
    return (
      <div className='auth-login'>
        <form
          name='login'
          onSubmit={ logIn }
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

export default connect(
  null,
  actions
)(LogIn);
