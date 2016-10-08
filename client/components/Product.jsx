import React, { Component, PropTypes } from 'react';

export default class Product extends Component {
  render() {
    return (
      <div className='products-item' />
    );
  }
}

Product.displayName = 'Product';
Product.propTypes = {
  item: PropTypes.object,
  addItem: PropTypes.func.isRequired,
  fav: PropTypes.func.isRequired
};
