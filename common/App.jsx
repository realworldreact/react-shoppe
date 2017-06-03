import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav/Nav.jsx';
import Products from './Products/Products.jsx';

const propTypes = {};

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Nav />
        <div className='app-child'>
          <Route
            component={ Products }
            path='/'
          />
        </div>
      </div>
    );
  }
}

App.displayName = 'App';
App.propTypes = propTypes;
