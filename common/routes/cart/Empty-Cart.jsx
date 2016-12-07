import React, { PureComponent } from 'react';

export default class EmptyCart extends PureComponent {
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
EmptyCart.displayName = 'EmptyCart';
