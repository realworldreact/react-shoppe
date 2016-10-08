import React, { cloneElement, PropTypes, Component } from 'react';
import Nav from './Nav.jsx';
import { fetchProducts } from '../api.js';


export default class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      user: null,
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
    this.setState({
      user,
      cart: user.cart,
      favs: user.favs
    });
  }

  fetchProductsCompleted(products = []) {
    this.setState({ products });
  }

  updateCart(cart = []) {
    this.setState({ cart });
  }

  updateFavs(favs = []) {
    this.setState({ favs });
  }

  componentDidMount() {
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
        <Nav />
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
