import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  numOfItems: PropTypes.number
};

export default class Nav extends Component {
  render() {
    const { isSignedIn, name, numOfItems } = this.props;
    let navListClassName = 'nav-list';
    let leftNav = null;
    if (isSignedIn) {
      navListClassName = navListClassName + ' nav-list-named';
      leftNav = (
        <ul>
          <li className='nav-list-user-logo'>
            <img src='/images/navbar/UserLogo.png' />
          </li>
          <li className='nav-list-user-name'>{ name }</li>
          <li className='nav-list-cart'>
            <Link to='/cart'>
              <img src='/images/navbar/CartIcon.png' />
              { numOfItems }
            </Link>
          </li>
        </ul>
      );
    } else {
      leftNav = (
        <ul>
          <li><Link to='/sign-up'>Sign Up</Link></li>
          <li><Link to='/log-in'>Log In</Link></li>
        </ul>
      );
    }
    return (
      <nav className='nav'>
        <Link
          className='nav-logo'
          to='/'
          >
          <img src='/images/navbar/Logo.png' />
        </Link>
        <div className={ navListClassName }>
          { leftNav }
        </div>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
Nav.displayName = 'Nav';
