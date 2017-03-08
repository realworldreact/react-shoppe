import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logIn, signUp } from '../redux.js';

const mapDispatchToProps = {
  signUp,
  logIn
};

const propTypes = {
  logIn: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired
};

export class Auth extends React.Component {

  render() {
    const {
      logIn,
      router,
      signUp
    } = this.props;
    const isLogin = router.isActive('log-in');
    const handleSubmit = isLogin ? logIn : signUp;
    return (
      <div className='auth-signup'>
        <form
          onSubmit={ handleSubmit }
          >
          <label>
            <input
              name='email'
              placeholder='email'
              type='email'
            />
          </label>
          {
            isLogin ?
              null :
              <label>
                <input
                  name='username'
                  placeholder='name'
                  type='text'
                />
              </label>
          }
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
  connect(null, mapDispatchToProps),
  withRouter
)(Auth);
