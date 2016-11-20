import React, { PropTypes, PureComponent } from 'react';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  addToCart: PropTypes.func.isRequired
};

const imageBase = '/images/products/';

export default class Product extends PureComponent {
  constructor(...props) {
    super(...props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, addToCart } = this.props;
    addToCart(id);
  }

  render() {
    const {
      name,
      description,
      image
    } = this.props;
    return (
      <div className='products-item'>
        <div className='products-item-stock-photo'>
          <img src={ `${imageBase}${image}` } />
        </div>
        <div className='products-item-name'>
          { name }
        </div>
        <div className='products-item-description'>
          { description }
        </div>
        <div className='products-item-footer' >
          <button
            className='products-item-favorite'
            onClick={ this.handleClick }
            >
            <img src='/images/AddToCartUnSelected.png' />
          </button>
          <button className='products-item-cart'>
            <img src='/images/HeartItemUnselected.png' />
          </button>
        </div>
      </div>
    );
  }
}
Product.displayName = 'Product';
Product.propTypes = propTypes;
