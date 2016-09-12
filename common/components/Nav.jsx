import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const propTypes = {
  name: PropTypes.string
};

const mapStateToProps = state => ({
  name: state.app.user && state.app.user.username
});

export class Nav extends Component {
  renderRightBar(name) {
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
            <img src='/images/navbar/CartIcon.png' />
            { 0 }
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
      name
    } = this.props;
    return (
      <nav className='nav'>
        <Link
          className='nav-logo'
          to='/'
          >
          <img src='/images/navbar/Logo.png' />
        </Link>
        { this.renderRightBar(name) }
      </nav>
    );
  }
}

Nav.propTypes = propTypes;

export default connect(
  mapStateToProps
)(Nav);
