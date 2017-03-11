import Fetcher from 'fetchr';
import { createElement } from 'react';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { renderToString } from 'react-redux-epic';

import createStore from '../../common/create-store.js';
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
    const { epic, store } = createStore({
      dependencies: { fetcher: new Fetcher({ req }) }
    });
    match({ location: req.path, routes }, (err, redirect, props) => {
      if (err) {
        return next(err);
      }
      return renderToString(
        createElement(Provider, { store }, createElement(RouterContext, props)),
        epic
      )
        .map(({ markup }) => {
          return {
            markup,
            data: store.getState()
          };
        })
        .subscribe(
          ({ markup, data }) => {
            res.expose(data, 'preloadedState');
            epic.unsubscribe();
            return res.render(
              'index',
              {
                title: 'react-shoppe',
                markup
              }
            );
          },
          next
        );
    });
  }

  app.use(router);
}
