import React, { Component, PropTypes } from 'react';
import includes from 'lodash/includes';
import { addToCart, fav } from '../api.js';

import Product from './Product.jsx';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  accessToken: PropTypes.string,
  userId: PropTypes.string,
  updateCart: PropTypes.func,
  updateFavs: PropTypes.func
};

export default class Products extends Component {
  addItemToCart(userId, accessToken, itemId) {
    if (!userId || !accessToken || !itemId) {
      return null;
    }
    addToCart(userId, accessToken, itemId).then(this.props.updateCart);
    return null;
  }

  favItem(userId, accessToken, itemId) {
    if (!userId || !accessToken || !itemId) {
      return null;
    }
    fav(userId, accessToken, itemId).then(this.props.updateFavs);
    return null;
  }

  renderProducts(favs, cart, products, userId, accessToken) {
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
          addItem={
            itemId => this.addItemToCart(userId, accessToken, itemId)
          }
          fav={
            itemId => this.favItem(userId, accessToken, itemId)
          }
          item={ item }
          key={ item.id }
        />
      ));
  }

  render() {
    const {
      favs,
      cart,
      products,
      userId,
      accessToken
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
              products,
              userId,
              accessToken
            )
          }
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;
