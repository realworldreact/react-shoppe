import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  name: PropTypes.string,
  numOfItems: PropTypes.number
};

export default class Nav extends Component {
  render() {
    const { name, numOfItems = 0 } = this.props;
    const navListClass = name ?
      'nav-list nav-list-named' :
      'nav-list';

    return (
      <nav className='nav'>
        <Link
          className='nav-logo'
          to='/'
          >
          <img src='/images/navbar/Logo.png' />
        </Link>
        <ul className={ navListClass }>
          {
            name ?
              (
                <div>
                  <li className='nav-list-user-logo'>
                    <img src={ '/images/navbar/UserLogo.png' } />
                  </li>
                  <li className='nav-list-user-name'>
                    { name }
                  </li>
                  <li className='nav-list-cart'>
                    <Link
                      to='/cart'
                      >
                      <img src={ '/images/navbar/CartIcon.png' } />
                      { numOfItems }
                    </Link>
                  </li>
                </div>
              ) :
              (
                <div>
                  <li className='nav-list-login'>
                    <Link
                      to='/log-in'
                      >
                      Log In
                    </Link>
                  </li>
                  <li className='nav-list-sign-up'>
                    <Link
                      to='/sign-up'
                      >
                      Sign Up
                    </Link>
                  </li>
                </div>
              )
          }
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
Nav.displayName = 'Nav';
