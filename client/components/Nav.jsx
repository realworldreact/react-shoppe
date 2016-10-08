import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  name: PropTypes.string,
  numOfItems: PropTypes.number
};

export default class Nav extends Component {
  renderRightBar(name, numOfItems) {
    if (name) {
      return (
        <ul className='nav-list nav-list-named'>
          <li className='nav-list-user-logo'>
            <img src='/images/navbar/UserLogo.png' />
          </li>
          <li className='nav-list-user-name'>
            { name }
          </li>
          <li className='nav-list-cart'>
            <Link to='/cart'>
              <img src='/images/navbar/CartIcon.png' />
              { numOfItems }
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <ul className='nav-list nav-list-unnamed'>
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
    );
  }

  render() {
    const {
      name,
      numOfItems
    } = this.props;
    return (
      <nav className='nav'>
        <Link
          className='nav-logo'
          to='/'
          >
          <img src='/images/navbar/Logo.png' />
        </Link>
        { this.renderRightBar(name, numOfItems) }
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
Nav.displayName = 'Nav';
