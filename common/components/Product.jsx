import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { addToCart, toggleFav } from '../redux.js';

function mapDispatchToProps(dispatch, { id }) {
  const dispatchers = {
    addToCart: () => dispatch(addToCart(id)),
    toggleFav: () => dispatch(toggleFav(id))
  };
  return () => dispatchers;
}

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  isInCart: PropTypes.bool,
  isFav: PropTypes.bool,
  addToCart: PropTypes.func.isRequired,
  toggleFav: PropTypes.func.isRequired
};

const imageBase = '/images/products/';

export class Product extends PureComponent {
  render() {
    const {
      name,
      description,
      image,
      isInCart,
      isFav,
      addToCart,
      toggleFav
    } = this.props;
    const cartButtonImage = isInCart ?
      'AddToCartSelected' :
      'AddToCartUnSelected';
    const favButtonImage = isFav ?
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
            onClick={ addToCart }
            >
            <img src={ `/images/${cartButtonImage}.png` } />
          </button>
          <button
            className='products-item-favorite'
            onClick={ toggleFav }
            >
            <img src={ `/images/${favButtonImage}.png` } />
          </button>
        </div>
      </div>
    );
  }
}
Product.displayName = 'Product';
Product.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps
)(Product);
