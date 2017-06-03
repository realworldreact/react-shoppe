import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav/Nav.jsx';
import Products from './Products/Products.jsx';
import Auth from './Auth/Auth.jsx';

import { fetchProducts } from './api.js';

const propTypes = {};

export default class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      products: [],
      user: {}
    };
    this.handleAuth = this.handleAuth.bind(this);
  }

  componentDidMount() {
    fetchProducts().then((products) => {
      this.setState({ products });
    });
  }

  handleAuth(user) {
    this.setState({
      user
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div className='app'>
        <Nav />
        <div className='app-child'>
          <Route
            exact={ true }
            path='/'
            render={ () => {
              return <Products products={products} />;
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
        </div>
      </div>
    );
  }
}

App.displayName = 'App';
App.propTypes = propTypes;
