import { createElement } from 'react';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import Fetcher from 'fetchr';
import { renderToString, wrapRootEpic } from 'react-redux-epic';

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
    const { wrappedEpic, store } = createAppStore(
      f => f,
      { fetcher },
      wrapRootEpic
    );
    match({ routes, location }, (err, _, props) => {
      if (err) {
        return next(err);
      }
      return renderToString(
        createElement(
          Provider,
          { store },
          createElement(RouterContext, props)
        ),
        wrappedEpic
      )
        .map(({ markup }) => {
          return res.render('index', {
            title: 'react-shoppe',
            html: markup
          });
        })
        .subscribe(
          null,
          next,
          () => console.log('Completed!')
        );
    });
  }

  app.use(router);
}
