import React, { Component, PropTypes } from 'react';

import Product from './Product.jsx';
import products from './products.json';

export default class Products extends Component {
  constructor(...args) {
    super(...args);
  }
  renderProducts(products) {
    if (!Array.isArray(products)) {
      return null;
    }
    return products.map(item => (
      <Product
        item={ item }
        key={ item.id }
      />
    )
    );
  }
  render() {
    const {
      products
    } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input'/>
        </div>
        <div className='products-lists'>
          { this.renderProducts(products) }
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
