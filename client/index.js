import { createElement } from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import App from '../common/App.jsx';
import childRoutes from '../common/routes';
import createReducer from '../common/create-reducer';

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const adjustUrlOnReplay = !!window.devToolsExtension;

const routes = {
  component: App,
  path: '/',
  ...childRoutes
};

const storeEnhancers = compose(
  applyMiddleware(
    routerMiddleware
  ),
  devTools
);

const store = createStore(
  createReducer(),
  storeEnhancers
);

// defaults to html5 history
// falls back to hash history if unavailable
const history = syncHistoryWithStore(
  browserHistory,
  store,
  { adjustUrlOnReplay }
);

render(
  createElement(
    Provider,
    { store },
    createElement(Router, { routes, history })
  ),
  window.document.getElementById('app')
);
