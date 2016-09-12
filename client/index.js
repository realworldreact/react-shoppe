import { createElement } from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import routes from '../common';
import createReducer from '../common/create-reducer';

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const adjustUrlOnReplay = !!window.devToolsExtension;

const storeEnhancers = compose(
  applyMiddleware(
    routerMiddleware(browserHistory),
    thunkMiddleware,
    promiseMiddleware
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
