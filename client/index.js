import { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';

import createAppStore from '../common/create-store.js';
import routes from '../common/routes.jsx';

const win = typeof window !== 'undefined' ? window : {};
const devTools =
  typeof win.__REDUX_DEVTOOLS_EXTENSION__ === 'function' ?
  win.__REDUX_DEVTOOLS_EXTENSION__() :
  (f => f);

const preloadedState = win.__ar__ && win.__ar__.data;

const { store } = createAppStore({
  preloadedState,
  enhancers: [ devTools ],
  middlewares: [ routerMiddleware(history) ],
  dependencies: { storage: win.localStorage }
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
