import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../redux.js';

const mapDispatchToProps = {
  signUp
};

const propTypes = {
  signUp: PropTypes.func.isRequired
};

export class SignUp extends React.Component {

  render() {
    return (
      <div className='auth-signup'>
        <form
          onSubmit={ this.props.signUp }
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

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
