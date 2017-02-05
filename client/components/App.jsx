import React, { cloneElement, PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav.jsx';
import {
  removeFromCart,
  deleteFromCart,
  fetchProducts,
  fetchUser,
  fav
} from '../api.js';

import { updateProducts, updateUser } from '../redux.js';

const mapDispatchToProps = {
  updateUser,
  updateProducts
};

export class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      user: {},
      products: [],
      accessToken: null,
      cart: [],
      favs: []
    };
    this.addToFav = this.addToFav.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  componentDidMount() {
    fetchProducts().then(products => this.props.updateProducts(products));
    const id = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    if (id && accessToken) {
      fetchUser(id, accessToken).then(user => {
        this.props.updateUser({ ...user, accessToken });
      });
    }
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

  render() {
    return (
      <div className='app'>
        <Nav username={ this.state.user.username }/>
        <div className='app-child'>
          {
            cloneElement(this.props.children, {
              addProducts: this.addProducts,
              addToFav: this.addToFav,
              removeFromCart: this.removeFromCart,
              deleteFromCart: this.deleteFromCart
            })
          }
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);

App.propTypes = {
  children: PropTypes.element
};
