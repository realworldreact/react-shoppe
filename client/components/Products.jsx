import React, { Component, PropTypes } from 'react';
import includes from 'lodash/includes';

import Product from './Product.jsx';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array
};

export default class Products extends Component {
  addItemToCart() {
  }

  favItem() {
  }

  renderProducts(favs, cart, products) {
    if (!Array.isArray(products)) {
      return null;
    }
    return products
      .map(item => {
        let newItem = { ...item };
        if (includes(favs, item.id)) {
          newItem.isFav = true;
        }
        if (includes(cart.map(({ id }) => id), item.id)) {
          newItem.isInCart = true;
        }
        return newItem;
      })
      .map(item => (
        <Product
          addItem={ this.addItemToCart }
          fav={ this.favItem }
          item={ item }
          key={ item.id }
        />
      ));
  }

  render() {
    const {
      favs,
      cart,
      products
    } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
          {
            this.renderProducts(
              favs,
              cart,
              products
            )
          }
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;
