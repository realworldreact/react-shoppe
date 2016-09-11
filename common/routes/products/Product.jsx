import React, { Component, PropTypes } from 'react';

export default class Product extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className='products-item'>
        <div className='products-item-stock-photo'>
          <img src={ `/images/products/${item.image}`} />
        </div>
        <div className='products-item-name'>
          { item.name }
        </div>
        <div className='products-item-description'>
          { item.description }
        </div>
        <div className='products-item-favorite'>
          <img src='/images/HeartItemSelected.png' />
        </div>
        <div className='products-item-chart'>
          <img src='/images/AddToCartSelected.png' />
        </div>
      </div>
    );
  }
}

Product.displayName = 'Product';
Product.propTypes = {
  item: PropTypes.object
};
