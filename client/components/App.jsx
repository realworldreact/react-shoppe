import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import find from 'lodash/find';
import Nav from './Nav.jsx';

import { fetchProducts } from '../redux.js';

const mapStateToProps = state => ({
  isSignedIn: state.isSignedIn,
  name: state.user.username
});

const mapDispatchToProps = {
  fetchProducts
};

const propTypes = {
  children: PropTypes.element,
  fetchProducts: PropTypes.func,
  isSignedIn: PropTypes.bool,
  name: PropTypes.string
};

export class App extends Component {
  componentDidMount() {
    this.props.fetchProducts();
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
