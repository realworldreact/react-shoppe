import React, { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import {
  updateUser,
  fetchProducts,
  fetchUser
} from '../redux.js';

const mapStateToProps = state => {
  return {
    user: state.user,
    isSignedIn: state.isSignedIn
  };
};

const mapDispatchToProps = {
  updateUser,
  fetchProducts,
  fetchUser
};
// dispatch => {
//   return {
//     updateProducts: (products) => {
//       return dispatch(updateProducts(products));
//     },
//     updateUser: user => {
//       return dispatch(updateUser(user));
//     },
//     fetchProducts: () => {
//       return dispatch(fetchProducts());
//     }
//   };
// };

export class App extends Component {
  constructor(...args) {
    super(...args);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(user = {}) {
    if (user.id && user.accessToken) {
      localStorage.setItem('id', user.id);
      localStorage.setItem('accessToken', user.accessToken);
    }
    this.props.updateUser(user);
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchUser();
  }

  render() {
    const {
      isSignedIn,
      user: { username: name }
    } = this.props;
    return (
      <div className='app'>
        <Nav
          isSignedIn={ isSignedIn }
          name={ name }
        />
        <div className='app-child'>
          {
            cloneElement(
              this.props.children,
              { updateUser: this.updateUser }
            )
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
