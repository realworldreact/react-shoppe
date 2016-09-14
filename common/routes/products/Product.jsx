import React, { Component, PropTypes } from 'react';

export default class Product extends Component {
  render() {
    const { addItem, item, fav } = this.props;
    const favImage = item.fav ?
      'HeartItemSelected' :
      'HeartItemUnselected';
    return (
      <div className='products-item'>
        <div className='products-item-stock-photo'>
          <img src={ `/images/products/${item.image}`} />
        </div>
        <div className='products-item-name'>
          { item.name }
        </div>
        <div className='products-item-description'>
          { item.description }
        </div>
        <div className='products-item-footer'>
          <button
            className='products-item-favorite'
            onClick={ () => fav(item.id) }
            title='Favorite this item'
            >
            <img src={ `/images/${favImage}.png` } />
          </button>
          <button
            className='products-item-cart'
            onClick={ () => addItem(item.id) }
            title='Add to Cart'
            >
            <img src='/images/AddToCartUnselected.png' />
          </button>
        </div>
      </div>
    );
  }
}

Product.displayName = 'Product';
Product.propTypes = {
  item: PropTypes.object,
  addItem: PropTypes.func.isRequired,
  fav: PropTypes.func.isRequired
};
