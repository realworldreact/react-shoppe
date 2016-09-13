import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { userSelector, cartSelector } from '../../redux';
import { productsSelector } from '../products/redux';

const propTypes = {
  user: PropTypes.object,
  cart: PropTypes.array,
  productsById: PropTypes.object
};

const mapStateToProps = state => {
  const products = productsSelector(state);
  return {
    ...userSelector(state),
    ...cartSelector(state),
    productsById: Object.keys(products)
      .map(key => products[key])
      .reduce((productMap, product) => {
        productMap[product.id] = product;
        return productMap;
      }, {})
  };
};

export class Cart extends Component {
  render() {
    const {
      cart
    } = this.props;
    return (
      <div>
        { cart.length }
      </div>
    );
  }
}

Cart.propTypes = propTypes;

export default connect(
  mapStateToProps
)(Cart);
