/* eslint-disable no-undefined */
import { createElement } from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { wrapRootEpic } from 'react-redux-epic';
import { RouterContext, match } from 'react-router';

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
    match({ routes, location }, (err, _, renderProps) => {
      if (err) { return next(err); }
      const { store, rootEpic } = createAppStore({
        wrapEpic: wrapRootEpic
      });
      const element = createElement(
        Provider,
        { store },
        createElement(
          RouterContext,
          renderProps
        )
      );
      const html = renderToString(element);
      return res.render(
        'index',
        {
          title: 'react-shoppe',
          html: html
        }
      );
      // return renderToString(element, rootEpic)
      //   .map(({ markup: html }) => {
      //     return res.render(
      //       'index',
      //       {
      //         title: 'react-shoppe',
      //         html: html
      //       }
      //     );
      //   });
    });
  }

  app.use(router);
}
