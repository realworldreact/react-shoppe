import React, { PropTypes, Component } from 'react';

/* eslint-disable */
const items = [
  {
    "id": "2",
    "name": "Apricots",
    "description": "An apricot is a fruit or the tree that bears the fruit of several species in the genus Prunus. Grind the pits for a facial exfoliant.",
    "image": "apricot.png",
    "nutrition": ["Vitamin A", "Vitamin C"],
    "price": 1.50,
    "quantity": 2
  }
];
/* eslint-enable */

const propTypes = {
  cart: PropTypes.array,
  updateCart: PropTypes.func,
  user: PropTypes.object,
  products: PropTypes.array
};

export default class Cart extends Component {

  render() {
    if (items.length < 1) {
      return (
        <div className='cart cart-empty'>
          <div className='cart-title'>
            <h2>Your cart is empty</h2>
          </div>
        </div>
      );
    }
    return (
      <div
        className='cart'
        >
        <div className='cart-title'>
          <h2>My Cart</h2>
        </div>
        <div className='cart-list'>
          {
            items.map(item => (
              <div className='cart-list-row'>
                <div className='cart-list-item'>
                  <div className='cart-list-product'>
                    <div className='cart-list-stock-photo' >
                      <img src={ '/images/products/' + item.image } />
                    </div>
                    <div
                      className='cart-list-info'
                      >
                      <div className='cart-list-info-name'>
                        { item.name }
                      </div>
                      <div className='cart-list-info-price'>
                        $ { item.price }
                      </div>
                    </div>
                  </div>
                </div>
                <div className='cart-list-item'>
                  <div className='cart-count-up'>
                    <img src='/images/cart/AddOneItem.png' />
                  </div>
                  <div className='cart-count-count'>
                    { item.quantity }
                  </div>
                  <div className='cart-count-down'>
                    <img src='/images/cart/SubtractOneItem.png' />
                  </div>
                </div>
                <div className='cart-list-item'>
                  $ { item.price }
                </div>
                <div className='cart-list-item cart-delete-item'>
                  <img src='/images/cart/DeleteItem.png' />
                </div>
              </div>
            ))
          }
          <div className='cart-list-row'>
            <div className='cart-list-item' />
            <div className='cart-list-item'>
             Total
            </div>
            <div className='cart-list-item'>
              $ 19.99
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Cart.propTypes = propTypes;
