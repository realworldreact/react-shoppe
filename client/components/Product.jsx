import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux.js';

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    token: state.token
  };
};

const mapDispatchToProps = {
  addToCart
};

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  isInCart: PropTypes.bool,
  addToCart: PropTypes.func.isRequired
};

const imageBase = '/images/products/';

export class Product extends PureComponent {
  constructor(...props) {
    super(...props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, token, userId, addToCart } = this.props;
    this.props.addToCart(userId, token, id);
  }

  render() {
    const {
      name,
      description,
      image,
      isInCart
    } = this.props;
    const cartButtonClassName = isInCart ?
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
            onClick={ this.handleClick }
            >
            <img src={ `/images/${cartButtonClassName}.png` } />
          </button>
          <button className='products-item-favorite'>
            <img src='/images/HeartItemUnselected.png' />
          </button>
        </div>
      </div>
    );
  }
}
Product.displayName = 'Product';
Product.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
