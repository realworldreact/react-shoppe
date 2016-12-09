import { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import Fetcher from 'fetchr';

import createAppStore from '../common/create-store.js';
import routes from '../common/routes.jsx';

const win = typeof window !== 'undefined' ? window : {};
const preloadedState = win.__rs__ && win.__rs__.preloadedState;
const devTools =
  typeof win.__REDUX_DEVTOOLS_EXTENSION__ === 'function' ?
  win.__REDUX_DEVTOOLS_EXTENSION__() :
  (f => f);

const fetcher = new Fetcher({ xhrPath: '/services' });

const { store } = createAppStore({
  preloadedState,
  middlewares: [
    routerMiddleware(history)
  ],
  devTools,
  dependencies: {
    storage: win.localStorage,
    fetcher
  }
});

// <Provider store={ store }>
//   <Router routes={ routes } history={ history } />
// </Provider>
render(
  createElement(
    Provider,
    { store },
    createElement(Router, { routes, history }),
  ),
  window.document.getElementById('app')
);

// reducer(CurrentState, Action) => newState
