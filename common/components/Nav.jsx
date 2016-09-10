import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <div className='nav-logo'>
          <img src='/images/navbar/Logo.png' />
        </div>
        <ul className='nav-list'>
          <li className='nav-list-login'>
            <a href='/login'>
              Login
            </a>
          </li>
          <li className='nav-list-sign-up'>
            <a href='/sign-up'>
              Signup
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
