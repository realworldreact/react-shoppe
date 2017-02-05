import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav.jsx';
import {
  updateProducts,
  updateUser,
  fetchProducts,
  fetchUser
} from '../redux.js';

const mapDispatchToProps = {
  updateUser,
  updateProducts,
  fetchProducts,
  fetchUser
};

export class App extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchUser();
  }

  render() {
    return (
      <div className='app'>
        <Nav />
        <div className='app-child'>
          { this.props.children }
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
  children: PropTypes.element,
  fetchProducts: PropTypes.func,
  fetchUser: PropTypes.func
};
