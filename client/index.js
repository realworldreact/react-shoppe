import { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';
import { Provider } from 'react-redux';
import Fetcher from 'fetchr';

import createAppStore from '../common/create-store.js';
import routes from '../common/routes.jsx';

const fetcher = new Fetcher({ xhrPath: '/services' });

const win = typeof window !== 'undefined' ? window : {};
const devTools =
  typeof win.__REDUX_DEVTOOLS_EXTENSION__ === 'function' ?
  win.__REDUX_DEVTOOLS_EXTENSION__() :
  (f => f);

const initialState = win.__ar__ && win.__ar__.initialState ?
  win.__ar__.initialState :
  {};

const { store } = createAppStore({
  devTools,
  initialState,
  deps: {
    fetcher,
    storage: win.localStorage,
    localStorage: win.localStorage
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
