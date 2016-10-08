import React, { cloneElement, PropTypes, Component } from 'react';
import Nav from './Nav.jsx';
import { fetchUser, fetchProducts } from '../api.js';

const store = typeof localStorage !== 'undefined' ? localStorage : false;
export default class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      user: {},
      products: [],
      cart: [],
      favs: []
    };
    this.addUser = this.addUser.bind(this);
    this.fetchProductsCompleted = this.fetchProductsCompleted.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.updateFavs = this.updateFavs.bind(this);
  }

  addUser(user = {}) {
    if (user.id && user.accessToken) {
      store.setItem('id', user.id);
      store.setItem('accessToken', user.accessToken);
    }

    this.setState({
      user,
      cart: user.cart,
      favs: user.favs
    });
  }

  fetchProductsCompleted(products = []) {
    this.setState({ products });
  }

  updateCart({ cart = [] }) {
    this.setState({ cart });
  }

  updateFavs({ favs = [] }) {
    this.setState({ favs });
  }

  componentDidMount() {
    const { id, accessToken } = store;
    if (id && accessToken) {
      fetchUser(id, accessToken).then(this.addUser);
    }
    fetchProducts().then(this.fetchProductsCompleted);
  }

  render() {
    const {
      user,
      cart,
      favs,
      products
    } = this.state;
    return (
      <div className='app'>
        <Nav
          name={ user.username }
          numOfItems={ cart.length }
        />
        <div className='app-child'>
          {
            cloneElement(
              this.props.children,
              {
                user,
                cart,
                favs,
                products,
                addUser: this.addUser,
                updateCart: this.updateCart,
                updateFavs: this.updateFavs
              }
            )
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};
