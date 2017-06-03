import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav/Nav.jsx';
import Products from './Products/Products.jsx';

import { fetchProducts } from './api.js';

const propTypes = {};

export default class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetchProducts().then((products) => {
      this.setState({ products });
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div className='app'>
        <Nav />
        <div className='app-child'>
          <Route
            render={ () => {
              return <Products products={products} />;
            }}
            path='/'
          />
        </div>
      </div>
    );
  }
}

App.displayName = 'App';
App.propTypes = propTypes;
