import React, { Component } from 'react';
import Nav from './Nav/Nav.jsx';

const propTypes = {};

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Nav />
        <div className='app-child' />
      </div>
    );
  }
}

App.displayName = 'App';
App.propTypes = propTypes;
