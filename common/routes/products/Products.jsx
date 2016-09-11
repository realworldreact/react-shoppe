import React, { Component, PropTypes } from 'react';

import products from './products.json';

export default class Products extends Component {
  constructor(...args) {
    super(...args);
  }
  render() {
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
          Products Page
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
