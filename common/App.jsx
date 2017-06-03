import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav/Nav.jsx';
import Products from './Products/Products.jsx';
import Auth from './Auth/Auth.jsx';
import Cart from './Cart/Cart.jsx';

import { fetchUser, fetchProducts, makeCartApiCall } from './api.js';

const propTypes = {};

export default class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      products: [],
      user: {},
      token: '',
      userId: ''
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (id && token) {
      fetchUser(id, token).then(user => {
        console.log('user: ', user);
        this.handleAuth(user);
      });
    }
    fetchProducts().then((products) => {
      this.setState({ products });
    });
  }

  handleAuth(user) {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('token', user.accessToken);
    this.setState({
      user,
      token: user.accessToken,
      userId: user.id,
      cart: user.cart
    });
  }

  addToCart(itemId) {
    const method = 'ADD_TO_CART';
    const { token, userId } = this.state;
    console.log('attemt to add: ', itemId);
    console.log('userId: ', userId);
    makeCartApiCall(
      method,
      userId,
      token,
      itemId
    ).then(({ cart }) => {
      console.log('cart: ', cart);
      this.setState({
        cart
      });
    });
  }

  render() {
    const { products, user } = this.state;
    const {
      cart = [],
      username
    } = user;
    return (
      <div className='app'>
        <Nav
          isSignedIn={ !!username }
          name={ username }
          numOfItems={ cart.length }
        />
        <div className='app-child'>
          <Route
            exact={ true }
            path='/'
            render={ () => {
              return (
                <Products
                  addToCart={ this.addToCart }
                  products={products}
                />
              );
            }}
          />
          <Route
            path='/sign-up'
            render={ () => {
              return <Auth isSignUp={ true } onSubmit={ this.handleAuth }/>;
            } }
          />
          <Route
            path='/log-in'
            render={ () => {
              return <Auth isSignUp={ false } onSubmit={ this.handleAuth }/>;
            }}
          />
          <Route
            path='/cart'
            render={() => {
              return <Cart />;
            }}
          />
        </div>
      </div>
    );
  }
}

App.displayName = 'App';
App.propTypes = propTypes;
