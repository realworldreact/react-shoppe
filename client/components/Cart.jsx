import React, { PropTypes, Component } from 'react';

const propTypes = {
  cart: PropTypes.array,
  updateCart: PropTypes.func,
  user: PropTypes.object,
  products: PropTypes.array
};

export default class Cart extends Component {

  render() {
    return (
      <div className='cart cart-empty'>
        <div className='cart-title'>
          <h2>Your cart is empty</h2>
        </div>
      </div>
    );
  }
}


Cart.propTypes = propTypes;
