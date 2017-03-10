import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux.js';

function mapDispatchToProps(dispatch, { id }) {
  const dispatchers = {
    addToCart: () => dispatch(addToCart(id))
  };
  return () => dispatchers;
}

const propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  isInCart: PropTypes.bool,
  addToCart: PropTypes.func.isRequired
};

const imageBase = '/images/products/';

export class Product extends PureComponent {
  render() {
    const {
      name,
      description,
      image,
      isInCart,
      addToCart
    } = this.props;
    const cartButtonImage = isInCart ?
      'AddToCartSelected' :
      'AddToCartUnSelected';

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
