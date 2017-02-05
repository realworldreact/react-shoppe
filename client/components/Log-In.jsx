import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { logIn } from '../redux.js';

const propTypes = {
  logIn: PropTypes.func
};

const mapDispatchToProps = {
  logIn
};

export class LogIn extends React.Component {
  render() {
    return (
      <div className='auth-login'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.logIn(e.target);
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
