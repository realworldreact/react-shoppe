import 'rxjs';
import { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';
import { Provider } from 'react-redux';
import Fetcher from 'fetchr';

import createAppStore from '../common/create-store.js';
import routes from '../common/routes.jsx';

const win = typeof window !== 'undefined' ? window : {};
const devTools =
  typeof win.__REDUX_DEVTOOLS_EXTENSION__ === 'function' ?
  win.__REDUX_DEVTOOLS_EXTENSION__() :
  (f => f);

const store = createAppStore(
  devTools,
  {
    localStorage: win.localStorage,
    fetcher: new Fetcher({ xhrPath: '/services' })
  }
);

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
