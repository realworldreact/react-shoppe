import React, { PropTypes } from 'react';
import { signUp } from '../api.js';

const propTypes = {
  addUser: PropTypes.func
};

export default class SignUp extends React.Component {
  constructor(...props) {
    super(...props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    signUp(form).then(user => this.props.addUser(user));
  }

  render() {
    return (
      <div className='auth-signup'>
        <form
          onSubmit={ this.handleSubmit }
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
              type='email'
            />
          </label>
          <label>
            <input
              name='password'
              placeholder='password'
              type='password'
            />
          </label>
          <button
            type='submit'
            >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

SignUp.displayName = 'SignUp';
SignUp.propTypes = propTypes;
