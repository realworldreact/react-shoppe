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
        <div className='products-item-footer'>
          <a
            className='products-item-favorite'
            title='Favorite this item'
            >
            <img src='/images/HeartItemUnselected.png' />
          </a>
          <a
            className='products-item-cart'
            title='Add to Cart'
            >
            <img src='/images/AddToCartUnselected.png' />
          </a>
        </div>
      </div>
    );
  }
}

Product.displayName = 'Product';
Product.propTypes = {
  item: PropTypes.object
};
