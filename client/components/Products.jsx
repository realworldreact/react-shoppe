import React, { Component, PropTypes } from 'react';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  updateCart: PropTypes.func,
  updateFavs: PropTypes.func
};

export default class Products extends Component {
  render() {
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;
