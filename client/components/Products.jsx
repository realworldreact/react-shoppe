import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Product from './Product.jsx';
import { updateFilter } from '../redux.js';

const mapStateToProps = state => {
  const {
    search,
    products,
    cart
  } = state;
  return {
    search,
    products: products.map(item => {
      const isInCart = cart.some(
        cartItem => item.id === cartItem.id
      );
      if (isInCart) {
        return {
          ...item,
          isInCart
        };
      }
      return item;
    })
  };
};

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

  renderProducts(filter, products) {
    if (!Array.isArray(products)) {
      return <div>Loading...</div>;
    }
    const { addToCart } = this.props;
    let finalProducts = products;
    if (filter) {
      finalProducts = products.filter(product => {
        return filter.test(product.name);
      });
    }
    return finalProducts.map(item => (
      <Product
        { ...item }
        addToCart={ addToCart }
        key={ item.id }
      />
    ));
  }

  render() {
    const { products, search } = this.props;
    let filter;
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
          { this.renderProducts(filter, products) }
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
