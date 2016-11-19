import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
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
        <ul className='nav-list'>
          <li>
            <Link to='/sign-up'>
              Sign Up
            </Link>
          </li>
          <li>
            <Link to='/log-in'>
              Log In
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
Nav.displayName = 'Nav';
