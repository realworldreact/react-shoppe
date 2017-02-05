import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  username: PropTypes.string,
  numOfItems: PropTypes.number
};

export default class Nav extends Component {
  render() {
    const { username } = this.props;
    return (
      <nav className='nav'>
        <Link
          className='nav-logo'
          to='/'
          >
          <img src='/images/navbar/Logo.png' />
        </Link>
        <ul
          className='nav-list nav-list-named'
          >
          {
            username ?
              (
                <span>
                  <li className='nav-list-user-logo'>
                    <img src='/images/navbar/UserLogo.png' />
                  </li>
                  <li className='nav-list-user-name'>
                    { username }
                  </li>
                  <li className='nav-list-cart'>
                    <Link to='/cart'>
                      <img src='/images/navbar/CartIcon.png' />
                    </Link>
                  </li>
                </span>
              ) :
              (
                <span>
                  <li className=''>
                    <Link to='/sign-up'>
                      Sign Up
                    </Link>
                  </li>
                  <li className='nav-list-login'>
                    <Link to='/log-in'>
                      Log In
                    </Link>
                  </li>
                </span>
              )
          }
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
Nav.displayName = 'Nav';
