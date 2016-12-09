import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';

import { autoLogin, fetchProducts } from '../redux.js';

const mapStateToProps = state => ({
  isSignedIn: state.isSignedIn,
  name: state.user.username,
  numOfItems: state.cart.length
});

const mapDispatchToProps = {
  fetchProducts,
  autoLogin
};

const propTypes = {
  children: PropTypes.element,
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  numOfItems: PropTypes.number,
  fetchProducts: PropTypes.func.isRequired,
  autoLogin: PropTypes.func.isRequired
};

export class App extends Component {
  componentWillMount() {
    this.props.fetchProducts();
  }
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    const {
      isSignedIn,
      name,
      numOfItems
    } = this.props;
    return (
      <div className='app'>
        <Nav
          isSignedIn={ isSignedIn }
          name={ name }
          numOfItems={ numOfItems }
        />
        <div className='app-child'>
          { this.props.children }
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
