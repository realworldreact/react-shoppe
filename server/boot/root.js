import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
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
    const fetcher = new Fetcher({ req });
    const store = createAppStore(f => f, { fetcher });
    match({ routes, location }, (err, _, props) => {
      if (err) {
        return next(err);
      }
      const html = renderToString(
        createElement(
          Provider,
          { store },
          createElement(RouterContext, props)
        )
      );
      return res.render('index', {
        title: 'react-shoppe',
        html
      });
    });
  }

  app.use(router);
}
