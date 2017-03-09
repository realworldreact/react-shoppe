import React, { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import {
  fetchProducts,
  fetchUser
} from '../redux.js';

const mapDispatchToProps = {
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
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchUser();
  }

  render() {
    return (
      <div className='app'>
        <Nav />
        <div className='app-child'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default connect(
  null,
  mapDispatchToProps
)(App);
