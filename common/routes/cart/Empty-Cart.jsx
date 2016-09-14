import React from 'react';
import { Link } from 'react-router';

export default function EmptyCart() {
  return (
    <div className='cart cart-empty'>
      <div className='cart-title'>
        <h2>Your cart is empty</h2>
      </div>
      <Link
        className='cart-empty-link'
        to='/'
        >
        <div className='cart-empty-link-text'>
          Add some fruit!
        </div>
      </Link>
    </div>
  );
}
