import React, { PropTypes, Component, cloneElement } from 'react';
import Nav from './Nav.jsx';
import { fetchProducts } from '../api.js';

export default class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      products: [],
      token: null,
      isSignedIn: false
    };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(user = {}) {
    this.setState({
      user,
      token: user.accessToken,
      isSignedIn: !!user.username
    });
  }

  componentDidMount() {
    fetchProducts()
      .then(products => this.setState({ products }))
      .catch(err => console.error(err));
  }

  render() {
    const { products } = this.state;
    return (
      <div className='app'>
        <Nav />
        <div className='app-child'>
          {
            cloneElement(
              this.props.children,
              {
                updateUser: this.updateUser,
                products
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
