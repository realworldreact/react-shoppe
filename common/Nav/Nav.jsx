import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  numOfItems: PropTypes.number
};

export default class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <Link
          className='nav-logo'
          to='/'
          >
          <img src='/images/navbar/Logo.png' />
        </Link>
        <ul className='nav-list' />
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
Nav.displayName = 'Nav';
