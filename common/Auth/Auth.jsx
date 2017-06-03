import React, { PropTypes, Component } from 'react';

import { auth } from '../api.js';

const propTypes = {
  onSubmit: PropTypes.func
};

export default class Auth extends Component {
  constructor(...args) {
    super(...args);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    auth(true, e.target)
      .then(user => {
        console.log('user: ', user);
        this.props.onSubmit(user);
      });
  }

  render() {
    return (
      <div className="auth">
        <form onSubmit={ this.handleSubmit }>
          <label>
            <input name="email" placeholder="email" type="email" />
          </label>
          <label>
            <input name="username" placeholder="name" type="text" />
          </label>
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
