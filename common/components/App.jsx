import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';

import { autoLogin, fetchProducts } from '../redux.js';

const mapStateToProps = state => ({
  isSignedIn: state.isSignedIn,
  name: state.user.username
});

const mapDispatchToProps = {
  fetchProducts,
  autoLogin
};

const propTypes = {
  children: PropTypes.element,
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  fetchProducts: PropTypes.func.isRequired,
  autoLogin: PropTypes.func.isRequired
};

export class App extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.autoLogin();
  }

  render() {
    const {
      isSignedIn,
      name
    } = this.props;
    return (
      <div className='app'>
        <Nav
          isSignedIn={ isSignedIn }
          name={ name }
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
