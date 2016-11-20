import React, { Component, PropTypes } from 'react';
import Product from './Product.jsx';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  addToCart: PropTypes.func,
  updateFavs: PropTypes.func
};

export default class Products extends Component {
  renderProducts(products) {
    if (!Array.isArray(products)) {
      return <div>Loading...</div>;
    }
    const { addToCart } = this.props;
    return products.map(item => (
      <Product
        { ...item }
        addToCart={ addToCart }
        key={ item.id }
      />
    ));
  }

  render() {
    const { products } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
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
