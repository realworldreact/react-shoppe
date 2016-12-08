import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Product from './Product.jsx';
import { productSelector, updateFilter } from '../redux.js';

const mapStateToProps = createSelector(
  productSelector,
  state => state.cart,
  state => state.favs,
  state => state.search,
  (products, cart, favs, search) => {
  let filter = false;
  if (search.length > 3) {
    filter = new RegExp(
      search
        .replace(' ', '.')
        .split('')
        .join('.*')
      ,
      'i'
    );
  }
  return {
    search,
    products: products
      .map(item => {
        const isInCart = cart.some(cartItem => item.id === cartItem.id);
        const isFav = favs.some(fav => item.id === fav);
        if (isInCart || isFav) {
          return {
            ...item,
            isInCart,
            isFav
          };
        }
        return item;
      })
      .filter(item => (!filter || filter.test(item.name)))
  };
});

const mapDispatchToProps = {
  updateFilter
};

const propTypes = {
  search: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  addToCart: PropTypes.func,
  updateFavs: PropTypes.func,
  updateFilter: PropTypes.func
};

export class Products extends Component {

  renderProducts(products) {
    if (!Array.isArray(products)) {
      return (
        <div className='empty'>
          <h2>
            Loading...
          </h2>
        </div>
      );
    }

    if (!products.length) {
      return (
        <div className='empty'>
          <h2>No products found</h2>
        </div>
      );
    }
    return products.map(item => (
      <Product
        { ...item }
        key={ item.id }
      />
    ));
  }

  render() {
    const { products, search } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input
            className='products-search_input'
            onChange={ this.props.updateFilter }
            value={ search }
          />
        </div>
        <div className='products-lists'>
          { this.renderProducts(products) }
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
