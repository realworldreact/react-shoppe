import React, { PropTypes } from 'react';
import { browserHistory as history } from 'react-router';
import { signUp } from '../api.js';

const propTypes = {
  updateUser: PropTypes.func
};

export default class SignUp extends React.Component {
  constructor(...props) {
    super(...props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    signUp(e.target)
      .then(this.props.updateUser)
      .then(() => {
        history.push('/');
      });
  }

  render() {
    return (
      <div className='auth-signup'>
        <form
          onSubmit={ this.handleSubmit }
          >
          <label>
            <input
              name='email'
              placeholder='email'
              type='email'
            />
          </label>
          <label>
            <input
              name='username'
              placeholder='name'
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
