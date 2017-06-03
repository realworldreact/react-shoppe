import React, { PropTypes, Component } from 'react';

import Product from './Product.jsx';

const propTypes = {
  addToCart: PropTypes.func,
  products: PropTypes.array
};

export default class Products extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      search: ''
    };
  }

  render() {
    const { search } = this.state;
    const { addToCart, products } = this.props;
    const searchRegex = new RegExp(search);
    return (
      <div className='products'>
        <div className='products-search'>
          <input
            className='products-search_input'
            onChange={ (e) => {
              console.log('searching for ', e.target.value);
              this.setState({
                search: e.target.value
              });
            } }
            value={ search }
          />
        </div>
        <div className='products-lists'>
          { products
              .filter(({ name }) => {
                if (search.length > 2) {
                  return searchRegex.test(name);
                }
                return true;
              })
              .map(({ id, name, description, image, isInCart }) => {
                return (
                  <Product
                    description={ description }
                    handleClick={ addToCart }
                    id={ id }
                    image={ image }
                    isInCart={ isInCart }
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
