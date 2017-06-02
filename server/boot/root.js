import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

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
    const Product = app.models.Product;
    const location = req.path;
    match({ location, routes }, (err, _, routerProps) => {
      if (err) {
        return next(err);
      }
      return Product.find({})
        .then(products => products.map(product => product.toJSON()))
        .then(products => {
          const store = createAppStore({
            initialState: {
              products: products.map(({ id }) => id),
              productsById: products.reduce((map, product) => {
                map[product.id] = product;
                return map;
              }, {})
            }
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
        })
        .catch(err => console.error(err));
    });
  }

  app.use(router);
}
