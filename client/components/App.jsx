import React, { cloneElement, PropTypes, Component } from 'react';

import Nav from './Nav.jsx';
import { fetchProducts, fetchUser } from '../api.js';

export default class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      user: {},
      products: []
    };
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    if (localStorage.userId && localStorage.accessToken) {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');
      fetchUser(userId, accessToken)
        .then(user => this.addUser(user));
    }
    fetchProducts().then(products => this.setState({ products }));
  }

  addUser(user = {}) {
    if (user.id && user.accessToken) {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('accessToken', user.accessToken);
    }
    this.setState({ user });
  }

  render() {
    const { user, products } = this.state;
    const { username } = user;
    return (
      <div className='app'>
        <Nav
          name={ username }
        />
        <div className='app-child'>
          {
            cloneElement(
              this.props.children,
              {
                addUser: this.addUser,
                products: products
              }
            )
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};
