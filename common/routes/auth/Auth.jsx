import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { auth } from '../../redux.js';
import serializeForm from '../../utils/serialize-form.js';

function mapStateToProps(state, { router }) {
  return {
    isSignUp: router.isActive('/sign-up')
  };
}

function mapDispatchToProps(dispatch, { router }) {
  const isSignUp = router.isActive('/sign-up');
  return {
    auth: e => {
      e.preventDefault();
      return dispatch(auth({
        isSignUp,
        form: serializeForm(e.target)
      }));
    }
  };
}

const propTypes = {
  isSignUp: PropTypes.bool,
  auth: PropTypes.func.isRequired
};

export class Auth extends React.Component {

  renderUserName(isSignUp) {
    if (!isSignUp) {
      return null;
    }
    return (
      <label>
        <input
          name='username'
          placeholder='name'
          type='text'
        />
      </label>
    );
  }
  render() {
    const {
      isSignUp
    } = this.props;
    return (
      <div className='auth'>
        <form
          onSubmit={ this.props.auth }
          >
          <label>
            <input
              name='email'
              placeholder='email'
              type='email'
            />
          </label>
          { this.renderUserName(isSignUp) }
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

Auth.displayName = 'Auth';
Auth.propTypes = propTypes;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Auth);
