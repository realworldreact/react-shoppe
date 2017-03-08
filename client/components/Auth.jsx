import React, { PropTypes } from 'react';
import { withRouter, browserHistory as history } from 'react-router';
import { logIn, signUp } from '../api.js';

const propTypes = {
  updateUser: PropTypes.func,
  router: PropTypes.object
};

export class Auth extends React.Component {
  constructor(...props) {
    super(...props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: null
    };
  }

  handleSubmit(e) {
    const {
      router
    } = this.props;
    const isLogin = router.isActive('log-in');
    const submit = isLogin ? logIn : signUp;
    e.preventDefault();
    submit(e.target)
      .then(this.props.updateUser)
      .then(() => {
        history.push('/');
      });
  }

  render() {
    const {
      router
    } = this.props;
    const isLogin = router.isActive('log-in');
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

export default withRouter(Auth);
