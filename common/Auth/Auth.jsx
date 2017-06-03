import React, { PropTypes, Component } from 'react';
import { Redirect } from 'react-router-dom';

import { auth } from '../api.js';

const propTypes = {
  isSignUp: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default class Auth extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isAuthed: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    auth(this.props.isSignUp, e.target)
      .then(user => {
        console.log('user: ', user);
        this.props.onSubmit(user);
        this.setState({ isAuthed: true });
      });
  }

  render() {
    const { isSignUp } = this.props;
    const { isAuthed } = this.state;
    if (isAuthed) {
      return <Redirect to='/' />;
    }
    return (
      <div className="auth">
        <form onSubmit={ this.handleSubmit }>
          <label>
            <input name="email" placeholder="email" type="email" />
          </label>
          { isSignUp ?
              <label>
                <input name="username" placeholder="name" type="text" />
              </label>
              : null
          }
          <label>
            <input name="password" placeholder="password" type="password" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

Auth.propTypes = propTypes;
