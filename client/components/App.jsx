import React, { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import Nav from './Nav.jsx';
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  fetchProducts
} from '../api.js';

import { fetchProductsComplete } from '../redux.js';

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = {
  fetchProductsComplete
};

const propTypes = {
  products: PropTypes.array,
  children: PropTypes.element,
  fetchProductsComplete: PropTypes.func
};

export class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      products: [],
      cart: [],
      token: null,
      isSignedIn: false,
      user: {}
    };
    this.updateUser = this.updateUser.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  updateUser(user = {}) {
    this.setState({
      user,
      cart: user.cart || [],
      token: user.accessToken,
      isSignedIn: !!user.username
    });
  }

  addToCart(itemId) {
    const { token, user: { id } } = this.state;
    addToCart(id, token, itemId)
      .then(cart => this.setState(cart));
  }

  deleteFromCart(itemId) {
    const { token, user: { id } } = this.state;
    deleteFromCart(id, token, itemId)
      .then(cart => this.setState(cart));
  }

  removeFromCart(itemId) {
    const { token, user: { id } } = this.state;
    removeFromCart(id, token, itemId)
      .then(cart => this.setState(cart));
  }


  componentDidMount() {
    fetchProducts()
      .then(products => this.props.fetchProductsComplete(products))
      .catch(err => console.error(err));
  }

  render() {
    const {
      isSignedIn,
      token,
      cart,
      user: {
        username: name
      }
    } = this.state;
    const { products } = this.props;
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
                updateUser: this.updateUser,
                addToCart: this.addToCart,
                deleteFromCart: this.deleteFromCart,
                removeFromCart: this.removeFromCart
              }
            )
          }
        </div>
      </div>
    );
  }
}

App.displayName = 'App';
App.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
