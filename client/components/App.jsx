import React, { cloneElement, PropTypes, Component } from 'react';
import _ from 'lodash';
import Nav from './Nav.jsx';
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  fetchProducts,
  fetchUser,
  fav
} from '../api.js';

export default class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      user: {},
      products: [],
      accessToken: null,
      cart: [],
      favs: [],
      filter: ''
    };
    this.updateUser = this.updateUser.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.addToFav = this.addToFav.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidMount() {
    fetchProducts().then(products => this.setState({ products: products }));
    const id = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    if (id && accessToken) {
      fetchUser(id, accessToken).then(user => {
        this.setState({
          user: user,
          accessToken: accessToken,
          cart: user.cart,
          favs: user.favs
        });
      });
    }
  }

  updateUser(user) {
    if (user.id && user.accessToken) {
      localStorage.setItem('id', user.id);
      localStorage.setItem('accessToken', user.accessToken);
    }
    this.setState({
      user: user,
      accessToken: user.accessToken,
      cart: user.cart,
      favs: user.favs
    });
  }

  addToCart(itemId) {
    const { user, accessToken } = this.state;
    if (!user.id || !accessToken) {
      return null;
    }
    return addToCart(user.id, accessToken, itemId)
      .then(({ cart }) => this.setState({ cart }));
  }

  removeFromCart(itemId) {
    const { user, accessToken } = this.state;
    if (!user.id || !accessToken) {
      return null;
    }
    return removeFromCart(user.id, accessToken, itemId)
      .then(({ cart }) => this.setState({ cart }));
  }

  deleteFromCart(itemId) {
    const { user, accessToken } = this.state;
    if (!user.id || !accessToken) {
      return null;
    }
    return deleteFromCart(user.id, accessToken, itemId)
      .then(({ cart }) => this.setState({ cart }));
  }

  addToFav(itemId) {
    const { user, accessToken } = this.state;
    if (!user.id || !accessToken) {
      return null;
    }
    return fav(user.id, accessToken, itemId)
      .then(({ favs }) => this.setState({ favs }));
  }

  updateFilter(filter) {
    this.setState({ filter: filter.replace('e', 'f') });
  }

  render() {
    return (
      <div className='app'>
        <Nav username={ this.state.user.username }/>
        <div className='app-child'>
          {
            cloneElement(this.props.children, {
              filter: this.state.filter,
              updateUser: this.updateUser,
              addProducts: this.addProducts,
              addToCart: this.addToCart,
              addToFav: this.addToFav,
              removeFromCart: this.removeFromCart,
              deleteFromCart: this.deleteFromCart,
              updateFilter: this.updateFilter,
              products: this.state.products
                .filter(
                  ({ name }) => (new RegExp(this.state.filter)).test(name)
                )
                .map(product => {
                  const isInCart = this.state.cart.some(item => {
                    return item.id === product.id;
                  });
                  const isFav = this.state.favs.some(itemId => {
                    return itemId === product.id;
                  });
                  if (isInCart || isFav) {
                    return {
                      ...product,
                      isInCart,
                      isFav
                    };
                  }
                  return product;
                }),
              cart: this.state.cart.map(item => {
                const productIndex = _.findIndex(
                  this.state.products,
                  (product) => {
                    return product.id === item.id;
                  }
                );
                return {
                  ...item,
                  ...this.state.products[productIndex]
                };
              })
            })
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};
