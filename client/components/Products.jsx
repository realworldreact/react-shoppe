import React, { Component, PropTypes } from 'react';
import Product from './Product.jsx';
import { fetchProducts } from '../api.js';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  updateCart: PropTypes.func,
  updateFavs: PropTypes.func
};

export default class Products extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      fetchProducts()
        .then(products => this.setState({ products }))
        .catch(err => console.error(err));
    }, 2000);
  }

  renderProducts(products) {
    if (!products.length) {
      return <div>Loading...</div>;
    }
    return products.map(item => (
      <Product
        key={ item.id }
        { ...item }
      />
    ));
  }

  render() {
    const { products } = this.state;
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
