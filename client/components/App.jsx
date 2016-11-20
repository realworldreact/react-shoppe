import React, { PropTypes, Component, cloneElement } from 'react';
import Nav from './Nav.jsx';
import { addToCart, fetchProducts } from '../api.js';

export default class App extends Component {
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

  componentDidMount() {
    fetchProducts()
      .then(products => this.setState({ products }))
      .catch(err => console.error(err));
  }

  render() {
    const {
      products,
      isSignedIn,
      token,
      user: {
        username: name,
        cart
      }
    } = this.state;
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
                token,
                products,
                updateUser: this.updateUser,
                addToCart: this.addToCart
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
