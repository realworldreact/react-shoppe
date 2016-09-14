import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Product from './Product.jsx';
import {
  productsSelector,
  fetchProducts,
  addItemToCart
} from '../../redux';

const mapStateToProps = productsSelector;

const actions = {
  fetchProducts,
  addItemToCart
};

const propTypes = {
  products: PropTypes.array,
  fetchProducts: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired
};

export class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  renderProducts(products, addItemToCart) {
    if (!Array.isArray(products)) {
      return null;
    }
    return products.map(item => (
      <Product
        addItem={ addItemToCart }
        item={ item }
        key={ item.id }
      />
    )
    );
  }
  render() {
    const {
      products,
      addItemToCart
    } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
          { this.renderProducts(products, addItemToCart) }
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
