import React, { PropTypes, Component } from 'react';

import Input from './Input.jsx';

const propTypes = {
  cart: PropTypes.array,
  updateCart: PropTypes.func,
  user: PropTypes.object,
  products: PropTypes.array
};

export default class Cart extends Component {

  render() {
    const { products, cart } = this.props;
    const productsById = products.reduce((byId, prod) => {
      byId[prod.id] = prod;
      return byId;
    }, {});

    const finalCart = cart.map(item => {
      if (productsById[item.id]) {
        return {
          ...productsById[item.id],
          quantity: item.count
        };
      } else {
        return false;
      }
    }).filter(item => !!item);

    const totalSum = finalCart.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    if (finalCart.length === 0) {
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
        <Input handleInput={ () => {} } />
        <div className='cart-list'>
          <div className='cart-list-row'>
            <div className='cart-list-item'>
              Item
            </div>
            <div className='cart-list-item'>
              Qty
            </div>
            <div className='cart-list-item'>
              Price
            </div>
            <div className='cart-list-item' />
          </div>
          {
            finalCart.map(item => (
              <div
                className='cart-list-row'
                key={ item.id }
                >
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
                        ${ item.price }
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
                  ${ item.quantity * item.price }
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
              ${ totalSum }
            </div>
            <div className='cart-list-item' />
          </div>
        </div>
      </div>
    );
  }
}


Cart.propTypes = propTypes;
