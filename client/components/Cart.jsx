import React, { PropTypes, Component } from 'react';

import { addToCart, removeFromCart, deleteFromCart } from '../api.js';
import EmptyCart from './Empty-Cart.jsx';

const propTypes = {
  cart: PropTypes.array,
  updateCart: PropTypes.func,
  user: PropTypes.object,
  products: PropTypes.array
};

export default class Cart extends Component {
  addItem(itemId) {
    const { id: userId, accessToken } = this.props.user;
    if (!userId || !accessToken || !itemId) {
      return null;
    }
    addToCart(userId, accessToken, itemId).then(this.props.updateCart);
    return null;
  }

  removeItem(itemId) {
    const { id: userId, accessToken } = this.props.user;
    if (!userId || !accessToken || !itemId) {
      return null;
    }
    removeFromCart(userId, accessToken, itemId).then(this.props.updateCart);
    return null;
  }

  deleteItem(itemId) {
    const { id: userId, accessToken } = this.props.user;
    if (!userId || !accessToken || !itemId) {
      return null;
    }
    deleteFromCart(userId, accessToken, itemId).then(this.props.updateCart);
    return null;
  }

  renderItemBox(item) {
    if (!item) {
      return null;
    }
    return (
      <div className='cart-list-product'>
        <div className='cart-list-stock-photo'>
          <img src={ `/images/products/${item.image}`} />
        </div>
        <div className='cart-list-info'>
          <div className='cart-list-info-name'>
            { item.name }
          </div>
          <div className='cart-list-info-price'>
            $ { item.price.toFixed(2) }
          </div>
        </div>
      </div>
    );
  }

  renderItems(items) {
    if (!items.length) {
      return null;
    }
    return items.map((item) => (
      <div
        className='cart-list-row'
        key={ item.id }
        >
        <div className='cart-list-item'>
          { this.renderItemBox(item) }
        </div>
        <div className='cart-list-item cart-list-count'>
          <div
            className='cart-count-item cart-count-up'
            onClick={ () => this.addItem(+item.id) }
            >
            <img src='/images/cart/AddOneItem.png' />
          </div>
          <div className='cart-count-item cart-count-count'>
            { item.count }
          </div>
          <div
            className='cart-count-item cart-count-down'
            onClick={ () => this.removeItem(+item.id) }
            >
            <img src='/images/cart/SubtractOneItem.png' />
          </div>
        </div>
        <div className='cart-list-item cart-list-price'>
          <div>
            $ { (item.count * item.price).toFixed(2) }
          </div>
        </div>
        <div
          className='cart-list-item cart-delete-item'
          onClick={ () => this.deleteItem(+item.id) }
          >
          <img src='/images/cart/DeleteItem.png' />
        </div>
      </div>
    ));
  }

  render() {
    const {
      cart,
      user,
      products
    } = this.props;

    const productsById = products.reduce((productMap, product) => {
      productMap[product.id] = product;
      return productMap;
    }, {});

    const filledCart = cart
      .map(({ id, count })=> {
        const product = productsById[id];
        if (!product) {
          return false;
        }
        return {
          ...product,
          count
        };
      })
      .filter(Boolean);

    const total = filledCart
      .reduce((total, { count, price }) => total + count * price, 0)
      .toFixed(2);

    if (filledCart.length === 0) {
      return (
        <EmptyCart />
      );
    }
    return (
      <div className='cart'>
        <div className='cart-title'>
          <h2>My Cart</h2>
        </div>
        <div className='cart-list'>
          <div className='cart-list-row'>
            <div className='cart-list-item'>
              <h4>Item</h4>
            </div>
            <div className='cart-list-item'>
              <h4>Qty</h4>
            </div>
            <div className='cart-list-item'>
              <h4>Price</h4>
            </div>
            <div className='cart-list-item' />
          </div>
          { this.renderItems(filledCart, user) }
          <div className='cart-list-row'>
            <div className='cart-list-item' />
            <div className='cart-list-item'>
              Total
            </div>
            <div className='cart-list-item'>
              $ { total }
            </div>
            <div className='cart-list-item' />
          </div>
        </div>
      </div>
    );
  }
}


Cart.propTypes = propTypes;
