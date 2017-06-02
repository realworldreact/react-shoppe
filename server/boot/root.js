import React from 'react';
import { renderToString } from 'react-redux-epic';
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
      const { wrappedRootEpic, store } = createAppStore({
        deps: {
          fetcher
        },
        initialState: {}
      });
      return renderToString(
        React.createElement(
          Provider,
          { store },
          React.createElement(
            RouterContext,
            routerProps
          )
        ),
        wrappedRootEpic
      )
        .map(({ markup }) => {
          const state = store.getState();
          app.expose(state, 'initialState');
          return res.render(
          'index',
            {
              title: 'react-shoppe',
              markup
            }
          );
        })
        .subscribe(
          null,
          next,
          () => {
            console.log('request complete');
          }
        );
    });
  }

  app.use(router);
}
