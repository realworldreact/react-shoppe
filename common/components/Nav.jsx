import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <div className='nav-logo'>
          <img src='/images/navbar/Logo.png' />
        </div>
        <ul className='nav-list'>
          <li className='nav-list-login'>
            <Link to='/log-in'>
              Login
            </Link>
          </li>
          <li className='nav-list-sign-up'>
            <Link to='/sign-up'>
              Signup
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
