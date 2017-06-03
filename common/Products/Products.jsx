import React, { Component } from 'react';

export default class Products extends Component {
  render() {
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <div className='products-lists'>
        </div>
      </div>
    );
  }
}
