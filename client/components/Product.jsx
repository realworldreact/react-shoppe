import React, { PropTypes, PureComponent } from 'react';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  isInCart: PropTypes.bool,
  isFav: PropTypes.bool,
  addToCart: PropTypes.func,
  addToFavs: PropTypes.func
};

const imageBase = '/images/products/';

export default class Product extends PureComponent {
  constructor(...props) {
    super(...props);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleFavClick = this.handleFavClick.bind(this);
  }

  handleCartClick() {
    const { id, addToCart } = this.props;
    addToCart(id);
  }

  handleFavClick() {
    const { id, addToFavs } = this.props;
    addToFavs(id);
  }

  render() {
    const {
      name,
      description,
      image,
      isInCart,
      isFav
    } = this.props;
    const cartButtonImage = isInCart ?
      'AddToCartSelected' :
      'AddToCartUnSelected';
    const favButtomImage = isFav ?
      'HeartItemSelected' :
      'HeartItemUnselected';
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
            className='products-item-cart'
            onClick={ this.handleCartClick }
            >
            <img src={ `/images/${cartButtonImage}.png` } />
          </button>
          <button
            className='products-item-favorite'
            onClick={ this.handleFavClick }
            >
            <img src={ `/images/${favButtomImage}.png` }/>
          </button>
        </div>
      </div>
    );
  }
}
Product.displayName = 'Product';
Product.propTypes = propTypes;
