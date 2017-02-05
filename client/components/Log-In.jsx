import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { logIn } from '../api.js';
import { updateUser } from '../redux.js';

const propTypes = {
  updateUser: PropTypes.func
};

const mapDispatchToProps = {
  updateUser
};

export class LogIn extends React.Component {
  render() {
    return (
      <div className='auth-login'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logIn(e.target).then(user => {
              this.props.updateUser(user);
              browserHistory.push('/');
            });
          }}
          >
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

LogIn.displayName = 'LogIn';
LogIn.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(LogIn);
