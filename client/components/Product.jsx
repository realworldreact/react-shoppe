import React, { PropTypes, PureComponent } from 'react';

const propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

const imageBase = '/images/products/';

export default class Product extends PureComponent {
  render() {
    const {
      name,
      description,
      image
    } = this.props;
    return (
      <div className='products-item'>
        <div className='products-item-stock-photo'>
          <img src={ `${imageBase}${image}` } />
        </div>
        <div className='products-item-name'>
          { name }
        </div>
        <div className='products-item-description'>
          { description }
        </div>
        <div className='products-item-footer' >
          <button className='products-item-favorite'>
            <img src='/images/AddToCartUnSelected.png' />
          </button>
          <button className='products-item-cart'>
            <img src='/images/HeartItemUnselected.png' />
          </button>
        </div>
      </div>
    );
  }
}
Product.displayName = 'Product';
Product.propTypes = propTypes;
