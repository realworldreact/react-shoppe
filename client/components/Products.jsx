import React, { Component, PropTypes } from 'react';

import { addToCart } from '../api.js';

const propTypes = {
  user: PropTypes.object,
  products: PropTypes.array,
  updateCart: PropTypes.func
};

export default class Products extends Component {
  addItemToCart(itemId) {
    const { user } = this.props;
    if (user.id && user.accessToken) {
      addToCart(user.id, user.accessToken, itemId)
        .then(({ cart }) => this.props.updateCart(cart));
    }
  }

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
                  <div
                    className='products-item-cart'
                    onClick={ () => this.addItemToCart(item.id) }
                    >
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
