import React, { Component, PropTypes } from 'react';
import Product from './Product.jsx';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  updateCart: PropTypes.func,
  updateFavs: PropTypes.func
};

const products = [
  {
    name: 'Apples',
    price: 0.5,
    description: 'The apple tree is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. Don\'t accept from snakes.',
    image: 'apple.png',
    nutrition: [
      'Vitamin C',
      'Fiber'
    ],
    id: '1'
  },
  {
    "name": "Oranges",
    "price": 0.5,
    "description": "The orange is the fruit of the citrus species Citrus × sinensis in the family Rutaceae. The fruit of the Citrus × sinensis is considered a sweet...",
    "image": "orange.png",
    "nutrition": [
      "Vitamin C",
      "Calcium",
      "Potassium"
    ],
    "id": "16"
  }
];

export default class Products extends Component {
  renderProducts(products) {
    if (!Array.isArray(products)) {
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
