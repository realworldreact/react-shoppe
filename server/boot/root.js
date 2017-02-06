import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer, { initialState } from '../../client/redux.js';
import routes from '../../client/routes.jsx';

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
    const { Product } = app.models;
    const location = req.path;
    Product.find({}).then(products => {
      match({ routes, location }, (err, redirectLocation, renderProps) => {
        if (err) {
          return next(err);
        }
        const preState = { ...initialState, products };
        const store = createStore(
          reducer,
          preState
        );
        const html = renderToString(
          createElement(
            Provider,
            { store },
            createElement(
              RouterContext,
              renderProps
            )
          )
        );
        res.expose(preState, 'initial_state');
        console.log(res.locals);
        return res.render(
        'index',
          {
            title: 'Advance Redux',
            html: html
          }
        );
      });
    }).catch(next);
  }

  app.use(router);
}
