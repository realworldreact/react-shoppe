import React, { Component, PropTypes } from 'react';

import Product from './Product.jsx';
import products from './products.json';

export default class Products extends Component {
  constructor(...args) {
    super(...args);
  }
  render() {
    const {
      products: [ product ]
    } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
          <Product item={ product } />
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.defaultProps = { products };
Products.propTypes = {
  products: PropTypes.array
};
