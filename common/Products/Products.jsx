import React, { Component } from 'react';

import Product from './Product.jsx';
import { fetchProducts } from '../api.js';

export default class Products extends Component {
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
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
          { products.map(({ name, description, image }) => {
            return (
              <Product
                description={ description }
                image={ image }
                key={ name }
                name={ name }
              />
            );
          }) }
        </div>
      </div>
    );
  }
}
