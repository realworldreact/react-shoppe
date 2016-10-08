import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.jsx';
import Products from './routes/products/Products.jsx';
import SignUp from './routes/auth/Sign-Up.jsx';
import LogIn from './routes/auth/Log-In.jsx';
import Cart from './routes/cart/Cart.jsx';

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
