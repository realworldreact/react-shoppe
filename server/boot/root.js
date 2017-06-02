import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import Fetcher from 'fetchr';

import createAppStore from '../../common/create-store.js';
import routes from '../../common/routes.jsx';

const reactRoutes = [
  '/',
  '/cart',
  '/sign-up',
  '/log-in'
];

export default function rootScript(app) {
  const router = app.loopback.Router();
  reactRoutes.forEach(route => {
    router.get(route, renderHome);
  });

  function renderHome(req, res, next) {
    const location = req.path;
    match({ location, routes }, (err, _, routerProps) => {
      if (err) {
        return next(err);
      }
      const fetcher = new Fetcher({ req });
      const store = createAppStore({
        deps: {
          fetcher
        },
        initialState: {}
      });
      const markup = renderToString(
        React.createElement(
          Provider,
          { store },
          React.createElement(
            RouterContext,
            routerProps
          )
        )
      );
      return res.render(
        'index',
        {
          title: 'react-shoppe',
          markup
        }
      );
    });
  }

  app.use(router);
}
