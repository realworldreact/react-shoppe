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
    return (
      <EmptyCart/>
    );
  }
}


Cart.propTypes = propTypes;
