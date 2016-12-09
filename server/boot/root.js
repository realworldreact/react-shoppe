import { createElement } from 'react';
import { Router, match } from 'react-router';
import { Provider } from 'react-redux';
import Fetcher from 'fetchr';
import { renderToString } from 'react-redux-epic';

import routes from '../../common/routes.jsx';
import createAppStore from '../../common/create-store.js';

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

    const fetcher = new Fetcher({ req });
    match({
      routes,
      location: req.originalUrl
    }, (err, redirect, props) => {
      if (err) {
        return next(err);
      }
      const { store, epic } = createAppStore({
        dependencies: { fetcher }
      });
      // renderToString(
      // <Provider store={ store } >
      //   <Router { ...props } />
      // </Provider>
      // )
      return renderToString(
        createElement(
          Provider,
          { store },
          createElement(Router, props)
        ),
        epic
      )
        .map(({ markup }) => {
          const preloadedState = store.getState();
          app.expose(preloadedState, 'preloadedState');
          epic.unsubscribe();
          return res.render(
            'index',
            {
              title: 'react-shoppe',
              markup
            }
          );
        });
    });
  }

  app.use(router);
}
