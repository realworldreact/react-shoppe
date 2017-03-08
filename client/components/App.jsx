import React, { PropTypes, Component, cloneElement } from 'react';
import Nav from './Nav.jsx';
import {
  addToCart,
  deleteFromCart,
  fetchProducts,
  removeFromCart,
  fetchUser,
  fav
} from '../api.js';
import find from 'lodash/find';

export default class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      search: '',
      products: [],
      cart: [],
      favs: [],
      token: null,
      isSignedIn: false,
      user: {}
    };
    this.updateUser = this.updateUser.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.addToFavs = this.addToFavs.bind(this);
  }

  updateUser(user = {}) {
    if (user.id && user.accessToken) {
      localStorage.setItem('id', user.id);
      localStorage.setItem('accessToken', user.accessToken);
    }
    this.setState({
      user,
      cart: user.cart || [],
      favs: user.favs || [],
      token: user.accessToken,
      isSignedIn: !!user.username
    });
  }

  addToCart(itemId) {
    const { token, user } = this.state;
    if (!user.id || !token) {
      return null;
    }
    return addToCart(user.id, token, itemId)
      .then(cart => this.setState(cart));
  }

  removeFromCart(itemId) {
    const { token, user } = this.state;
    if (!user.id || !token) {
      return null;
    }
    return removeFromCart(user.id, token, itemId)
      .then(cart => this.setState(cart));
  }

  deleteFromCart(itemId) {
    const { token, user } = this.state;
    if (!user.id || !token) {
      return null;
    }
    return deleteFromCart(user.id, token, itemId)
      .then(cart => this.setState(cart));
  }

  addToFavs(itemId) {
    const { user, token } = this.state;
    if (!user.id || !token) {
      return null;
    }
    return fav(user.id, token, itemId)
      .then(({ favs }) => this.setState({ favs }));
  }

  componentDidMount() {
    fetchProducts()
      .then(products => this.setState({ products }))
      .catch(err => console.error(err));

    const id = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    if (id && accessToken) {
      fetchUser(id, accessToken).then(user => {
        this.updateUser({ ...user, accessToken });
      });
    }
  }

  updateFilter(search) {
    this.setState({ search: search });
  }

  render() {
    const {
      products,
      isSignedIn,
      token,
      cart,
      favs,
      search,
      user: {
        username: name
      }
    } = this.state;

    let filter;
    if (search.length > 3) {
      filter = new RegExp(
        search
          .replace(' ', '.')
          .split('')
          .join('.*')
        ,
        'i'
      );
    }
    let finalProducts = products;
    if (filter) {
      finalProducts = products.filter(product => {
        return filter.test(product.name);
      });
    }
    return (
      <div className='app'>
        <Nav
          isSignedIn={ isSignedIn }
          name={ name }
        />
        <div className='app-child'>
          {
            cloneElement(
              this.props.children,
              {
                cart,
                filter: this.state.search,
                fullCart: cart.map(item => {
                  const product = find(
                    products,
                    product => product.id === item.id
                  );
                  return {
                    ...product,
                    ...item
                  };
                }),
                token,
                products: finalProducts.map(item => {
                  const isInCart = cart.some(
                    cartItem => item.id === cartItem.id
                  );
                  const isFav = favs.some(favId => {
                    return favId === item.id;
                  });
                  if (isInCart || isFav) {
                    return {
                      ...item,
                      isInCart,
                      isFav
                    };
                  }
                  return item;
                }),
                updateUser: this.updateUser,
                addToCart: this.addToCart,
                deleteFromCart: this.deleteFromCart,
                removeFromCart: this.removeFromCart,
                addToFavs: this.addToFavs
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
