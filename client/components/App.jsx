import React, { PropTypes, Component, cloneElement } from 'react';
import Nav from './Nav.jsx';
import { fetchProducts } from '../api.js';

export default class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      products: []
    };
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
              { products }
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
