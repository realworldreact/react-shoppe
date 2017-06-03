import React, { PropTypes, Component } from 'react';

import Product from './Product.jsx';

const propTypes = {
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
    const { products } = this.props;
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
              .map(({ name, description, image }) => {
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
