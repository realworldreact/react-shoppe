import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Product from './Product.jsx';
import { updateSearch } from '../redux.js';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  addToCart: PropTypes.func,
  addToFavs: PropTypes.func
};

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: (e) => {
      const { value } = e.target;
      return dispatch(updateSearch(value));
    }
  };
};

export class Products extends Component {
  renderProducts(filter, products) {
    if (!Array.isArray(products)) {
      return <div>Loading...</div>;
    }
    const { addToCart, addToFavs } = this.props;
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
        addToFavs={ addToFavs }
        key={ item.id }
      />
    ));
  }

  render() {
    const { search, products } = this.props;
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
            onChange={ this.props.updateSearch }
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
