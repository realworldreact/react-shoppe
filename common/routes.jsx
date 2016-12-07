import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Products from './components/Products.jsx';
import SignUp from './components/Sign-Up.jsx';
import LogIn from './components/Log-In.jsx';
import Cart from './components/Cart.jsx';

export default (
  <Route
    component={ App }
    path='/'
    >
    <IndexRoute component={ Products } />
    <Route
      component={ SignUp }
      path='sign-up'
    />
    <Route
      component={ LogIn }
      path='log-in'
    />
    <Route
      component={ Cart }
      path='cart'
    />
  </Route>
);
