import React, { cloneElement, PropTypes, Component } from 'react';

import Nav from './Nav.jsx';
import { fetchProducts, fetchUser } from '../api.js';

export default class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      user: {},
      cart: [],
      products: []
    };
    this.addUser = this.addUser.bind(this);
    this.updateCart = this.updateCart.bind(this);
  }

  componentDidMount() {
    if (localStorage.userId && localStorage.accessToken) {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');
      fetchUser(userId, accessToken)
        .then(user => this.addUser({ ...user, accessToken }));
    }
    fetchProducts().then(products => this.setState({ products }));
  }

  addUser(user = {}) {
    if (user.id && user.accessToken) {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('accessToken', user.accessToken);
    }
    this.setState({
      user,
      cart: user.cart || []
    });
  }

  updateCart(cart = []) {
    this.setState({ cart });
  }

  render() {
    const {
      user,
      cart,
      products
    } = this.state;
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
                user: user,
                cart: cart,
                products: products,
                addUser: this.addUser,
                updateCart: this.updateCart
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
