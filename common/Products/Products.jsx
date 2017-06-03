import React, { PropTypes, Component } from 'react';

import Product from './Product.jsx';

const propTypes = {
  products: PropTypes.array
};

export default class Products extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
          { products.map(({ name, description, image }) => {
            return (
              <Product
                description={ description }
                image={ image }
                key={ name }
                name={ name }
              />
            );
          }) }
        </div>
      </div>
    );
  }
}

Products.propTypes = propTypes;
