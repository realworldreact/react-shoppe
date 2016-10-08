import React, { PropTypes, Component } from 'react';
import Nav from './Nav.jsx';

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

App.propTypes = {
  children: PropTypes.element
};
