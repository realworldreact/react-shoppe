import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Products from './components/Products.jsx';
import Auth from './components/Auth.jsx';
import Cart from './components/Cart.jsx';

export default (
  <Route
    component={ App }
    path='/'
    >
    <IndexRoute component={ Products } />
    <Route
      component={ Auth }
      path='sign-up'
    />
    <Route
      component={ Auth }
      path='log-in'
    />
    <Route
      component={ Cart }
      path='cart'
    />
  </Route>
);
