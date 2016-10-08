import React, { Component, PropTypes } from 'react';

import { fav, addToCart } from '../api.js';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  user: PropTypes.object,
  products: PropTypes.array,
  updateCart: PropTypes.func,
  updateFavs: PropTypes.func
};

export default class Products extends Component {
  constructor(...props) {
    super(...props);
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      filter: ''
    };
  }

  addItemToCart(itemId) {
    const { user } = this.props;
    if (user.id && user.accessToken) {
      addToCart(user.id, user.accessToken, itemId)
        .then(({ cart }) => this.props.updateCart(cart));
    }
  }

  favItem(itemId) {
    const { user } = this.props;
    if (user.id && user.accessToken) {
      fav(user.id, user.accessToken, itemId)
        .then(({ favs }) => this.props.updateFavs(favs));
    }
  }

  handleFilter(e) {
    const filter = e.target.value;
    this.setState({ filter: filter.length < 3 ? '' : filter });
  }

  render() {
    const { favs, cart, products } = this.props;
    const { filter } = this.state;
    // replace spaces with any key to match dashes
    // makes search more fuzzy (thanks @xRahul)
    const filterReg = new RegExp(
      filter
        .replace(/ /g, '.')
        .split('')
        .join('.*'),
      'i'
    );
    return (
      <div className='products'>
        <div className='products-search'>
          <input
            className='products-search_input'
            onChange={ this.handleFilter }
          />
        </div>
        <div className='products-lists'>
          {
            products
              .filter(({ name }) => {
                if (filter < 3) {
                  return true;
                } else {
                  return filterReg.test(name);
                }
              })
              .map(item => (
                <div
                  className='products-item'
                  key={ item.id }
                  >
                  <div>
                    <img src={ '/images/products/' + item.image } />
                  </div>
                  <div className='products-item-name'>
                    { item.name }
                  </div>
                  <div className='products-item-description'>
                    { item.description }
                  </div>
                  <div className='products-item-footer'>
                    <div
                      className='products-item-favorite'
                      onClick={ () => this.favItem(item.id) }
                      >
                      <img
                        src={
                          favs.some(id => item.id === id) ?
                          '/images/HeartItemSelected.png' :
                          '/images/HeartItemUnselected.png'
                        }
                      />
                    </div>
                    <div
                      className='products-item-cart'
                      onClick={ () => this.addItemToCart(item.id) }
                      >
                      <img
                        src={
                          cart.some(({ id }) => id === item.id) ?
                          '/images/AddToCartSelected.png' :
                          '/images/AddToCartUnselected.png'
                        }
                      />
                    </div>
                  </div>
                </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;
