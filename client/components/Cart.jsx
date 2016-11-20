import React, { PropTypes, Component } from 'react';
import EmptyCart from './Empty-Cart.jsx';

const propTypes = {
  cart: PropTypes.array,
  updateCart: PropTypes.func,
  user: PropTypes.object,
  products: PropTypes.array
};

export default class Cart extends Component {

  render() {
    const {
      cart
    } = this.props;
    if (cart && cart.length === 0) {
      return (
        <EmptyCart />
      );
    }
    return (
      <div className='cart'>
        <div className='cart-title'>
          My Cart
        </div>
      </div>
    );
  }
}


Cart.propTypes = propTypes;
