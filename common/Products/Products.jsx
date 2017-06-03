import React, { Component } from 'react';

import Product from './Product.jsx';

const products = [
  {
    "id": "1",
    "name": "Apples",
    "description": "The apple tree is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. Don't accept from snakes.",
    "image": "apple.png",
    "nutrition": ["Vitamin C", "Fiber"],
    "price": 0.50
  },
  {
    "id": "2",
    "name": "Apricots",
    "description": "An apricot is a fruit or the tree that bears the fruit of several species in the genus Prunus. Grind the pits for a facial exfoliant.",
    "image": "apricot.png",
    "nutrition": ["Vitamin A", "Vitamin C"],
    "price": 1.50
  },
];

export default class Products extends Component {
  render() {
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
          { products.map(({ name, description, image }) => {
            return (
              <Product
                key={ name }
                name={ name }
                description={ description }
                image={ image }
              />
            );
          }) }
        </div>
      </div>
    );
  }
}
