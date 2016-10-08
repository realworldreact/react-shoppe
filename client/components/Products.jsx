import React, { Component, PropTypes } from 'react';

const propTypes = {
  products: PropTypes.array
};

export default class Products extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input
            className='products-search_input'
          />
        </div>
        <div className='products-lists'>
          {
            products.map(item => (
              <div
                className='products-item'
                key={ item.id }
                >
                <div>
                  <img src={ '/images/products/' + item.image } />
                </div>
                <div className='products-item-name'>
                  { item.name }
                </div>
                <div className='products-item-description'>
                  { item.description }
                </div>
                <div className='products-item-footer'>
                  <div className='products-item-favorite'>
                    <img src={ '/images/HeartItemUnselected.png' } />
                  </div>
                  <div className='products-item-cart'>
                    <img src={ '/images/AddToCartUnselected.png' } />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;
