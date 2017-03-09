import React, { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import {
  updateProducts,
  updateUser,
  fetchProducts,
  fetchUser,
  addToCart,
  removeFromCart,
  deleteFromCart,
  addToFavs
} from '../redux.js';
import find from 'lodash/find';

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    cart: state.cart,
    favs: state.favs,
    token: state.token,
    isSignedIn: state.isSignedIn
  };
};

const mapDispatchToProps = {
  updateProducts,
  updateUser,
  fetchProducts,
  fetchUser,
  addToCart,
  deleteFromCart,
  removeFromCart,
  addToFavs
};
// dispatch => {
//   return {
//     updateProducts: (products) => {
//       return dispatch(updateProducts(products));
//     },
//     updateUser: user => {
//       return dispatch(updateUser(user));
//     },
//     fetchProducts: () => {
//       return dispatch(fetchProducts());
//     }
//   };
// };

export class App extends Component {
  constructor(...args) {
    super(...args);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(user = {}) {
    if (user.id && user.accessToken) {
      localStorage.setItem('id', user.id);
      localStorage.setItem('accessToken', user.accessToken);
    }
    this.props.updateUser(user);
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchUser();
  }

  render() {
    const {
      isSignedIn,
      token,
      cart,
      favs,
      user: {
        username: name
      },
      products,
      addToCart,
      removeFromCart,
      deleteFromCart,
      addToFavs
    } = this.props;
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
                products: products.map(item => {
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
                addToCart,
                deleteFromCart,
                removeFromCart,
                addToFavs
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
