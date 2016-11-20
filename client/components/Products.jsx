import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Product from './Product.jsx';

const propTypes = {
  search: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  addToCart: PropTypes.func,
  updateFavs: PropTypes.func
};

export class Products extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      search: ''
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    const { value } = e.target;
    console.log('foo: ', e.target.value);
    this.props.dispatch({
      type: 'UPDATE_PRODUCTS_FILTER',
      search: value
    });
  }

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
            onChange={ this.handleKeyDown }
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

const mapStateToProps = state => {
  return {
    search: state.search
  };
};
const productsCreator = connect(mapStateToProps);

export default productsCreator(Products);
