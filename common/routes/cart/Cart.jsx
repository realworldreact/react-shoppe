import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import EmptyCart from './Empty-Cart.jsx';
import {
  fetchProducts,
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  userSelector,
  cartSelector,
  productsSelector
} from '../../redux';

const propTypes = {
  user: PropTypes.object,
  cart: PropTypes.array,
  cartEmpty: PropTypes.bool,
  total: PropTypes.string,
  fetchProducts: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  deleteItemFromCart: PropTypes.func.isRequired
};

const actions = {
  fetchProducts,
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart
};

const mapStateToProps = state => {
  const { products } = productsSelector(state);
  const productsById = products
    .reduce((productMap, product) => {
      productMap[product.id] = product;
      return productMap;
    }, {});

  const { cart } = cartSelector(state);
  const filledCart = cart
    .map(({ id, count })=> {
      const product = productsById[id];
      if (!product) {
        return false;
      }
      return {
        ...product,
        count
      };
    })
    .filter(Boolean);

  return {
    ...userSelector(state),
    cart: filledCart,
    cartEmpty: filledCart.length === 0,
    total: filledCart
      .reduce(
        (total, { count, price }) => total + count * price,
        0
      )
      .toFixed(2)
  };
};

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  renderItemBox(item) {
    if (!item) {
      return null;
    }
    return (
      <div className='cart-list-product'>
        <div className='cart-list-stock-photo'>
          <img src={ `/images/products/${item.image}`} />
        </div>
        <div className='cart-list-info'>
          <div className='cart-list-info-name'>
            { item.name }
          </div>
          <div className='cart-list-info-price'>
            $ { item.price.toFixed(2) }
          </div>
        </div>
      </div>
    );
  }
  renderItems(items, addItem, removeItem, deleteItem) {
    if (!items.length) {
      return null;
    }
    return items.map((item) => (
      <div
        className='cart-list-row'
        key={ item.id }
        >
        <div className='cart-list-item'>
          { this.renderItemBox(item) }
        </div>
        <div className='cart-list-item cart-list-count'>
          <div
            className='cart-count-item cart-count-up'
            onClick={ () => addItem(+item.id) }
            >
            <img src='/images/cart/AddOneItem.png' />
          </div>
          <div className='cart-count-item cart-count-count'>
            { item.count }
          </div>
          <div
            className='cart-count-item cart-count-down'
            onClick={ () => removeItem(+item.id) }
            >
            <img src='/images/cart/SubtractOneItem.png' />
          </div>
        </div>
        <div className='cart-list-item cart-list-price'>
          <div>
            $ { (item.count * item.price).toFixed(2) }
          </div>
        </div>
        <div
          className='cart-list-item'
          onClick={ () => deleteItem(+item.id) }
          >
          x
        </div>
      </div>
    ));
  }
  render() {
    const {
      cart,
      cartEmpty,
      total,
      addItemToCart,
      removeItemFromCart,
      deleteItemFromCart
    } = this.props;
    if (cartEmpty) {
      return (
        <EmptyCart />
      );
    }
    return (
      <div className='cart'>
        <div className='cart-title'>
          <h2>My Cart</h2>
        </div>
        <div className='cart-list'>
          <div className='cart-list-row'>
            <div className='cart-list-item'>
              <h4>Item</h4>
            </div>
            <div className='cart-list-item'>
              <h4>Qty</h4>
            </div>
            <div className='cart-list-item'>
              <h4>Price</h4>
            </div>
            <div className='cart-list-item' />
          </div>
          {
            this.renderItems(
              cart,
              addItemToCart,
              removeItemFromCart,
              deleteItemFromCart
            )
          }
          <div className='cart-list-row'>
            <div className='cart-list-item' />
            <div className='cart-list-item' />
            <div className='cart-list-item'>
              Total
            </div>
            <div className='cart-list-item'>
              $ { total }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Cart.propTypes = propTypes;

export default connect(
  mapStateToProps,
  actions
)(Cart);
