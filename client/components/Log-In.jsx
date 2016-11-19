import React, { PropTypes } from 'react';
import { browserHistory as history } from 'react-router';
import { logIn } from '../api.js';

const propTypes = {
  updateUser: PropTypes.func
};

export default class LogIn extends React.Component {
  constructor(...props) {
    super(...props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    logIn(e.target)
      .then(this.props.updateUser)
      .then(() => {
        history.push('/');
      });
  }

  render() {
    return (
      <div className='auth-login'>
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

LogIn.displayName = 'LogIn';
LogIn.propTypes = propTypes;
