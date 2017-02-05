import React, { PropTypes } from 'react';
import { signUp } from '../api.js';
import { browserHistory } from 'react-router';

const propTypes = {
  updateUser: PropTypes.func
};

export default class SignUp extends React.Component {
  render() {
    return (
      <div className='auth-signup'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUp(e.target).then(user => {
              this.props.updateUser(user);
              browserHistory.push('/');
            });
          }}
          >
          <label>
            <input
              name='username'
              placeholder='name'
              type='text'
            />
          </label>
          <label>
            <input
              name='email'
              placeholder='email'
              type='text'
            />
          </label>
          <label>
            <input
              name='password'
              placeholder='password'
              type='password'
            />
          </label>
          <button type='submit'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

SignUp.displayName = 'SignUp';
SignUp.propTypes = propTypes;
