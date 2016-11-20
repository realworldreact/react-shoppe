import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  numOfItems: PropTypes.number
};

export default class Nav extends Component {
  renderUserNav(name) {
    return (
      <div>
        <li className='nav-list-user-logo'>
          <img src='/images/navbar/UserLogo.png' />
        </li>
        <li className='nav-list-user-name'>{ name }</li>
        <li className='nav-list-cart'>
          <Link to='/cart'>
            <img src='/images/navbar/CartIcon.png' />
          </Link>
        </li>
      </div>
    );
  }

  renderButtons() {
    return (
      <div>
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
      </div>
    );
  }

  render() {
    const {
      isSignedIn,
      name
    } = this.props;
    let listClassName = 'nav-list';

    if (isSignedIn) {
      listClassName += ' nav-list-named';
    }

    return (
      <nav className='nav'>
        <Link
          className='nav-logo'
          to='/'
          >
          <img src='/images/navbar/Logo.png' />
        </Link>
        <ul className={ listClassName }>
          { isSignedIn ? this.renderUserNav(name) : this.renderButtons() }
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
Nav.displayName = 'Nav';
