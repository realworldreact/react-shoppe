import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import includes from 'lodash/includes';

import Product from './Product.jsx';
import {
  fetchProducts,
  addItemToCart,
  fav,
  favsSelector,
  productsSelector,
  cartSelector
} from '../../redux';

const mapStateToProps = state => {
  const { products } = productsSelector(state);
  const { favs } = favsSelector(state);
  const { cart } = cartSelector(state);
  return {
    products: products.map(item => {
      let newItem = { ...item };
      if (includes(favs, item.id)) {
        newItem.isFav = true;
      }
      if (includes(cart.map(({ id }) => id), item.id)) {
        newItem.isInCart = true;
      }
      return newItem;
    })
  };
};

const actions = {
  fetchProducts,
  addItemToCart,
  fav
};

const propTypes = {
  products: PropTypes.array,
  fetchProducts: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  fav: PropTypes.func.isRequired
};

export class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  renderProducts(products, addItemToCart, fav) {
    if (!Array.isArray(products)) {
      return null;
    }
    return products.map(item => (
      <Product
        addItem={ addItemToCart }
        fav={ fav }
        item={ item }
        key={ item.id }
      />
    )
    );
  }
  render() {
    const {
      products,
      addItemToCart,
      fav
    } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
          { this.renderProducts(products, addItemToCart, fav) }
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;

export default connect(
  mapStateToProps,
  actions
)(Products);
