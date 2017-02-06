import { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import routes from './routes.jsx';
import reducer, { initialState } from './redux.js';

const preState = (window.__ar__ && window.__ar__.initial_state) || initialState;

const store = createStore(
  reducer,
  preState,
  compose(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({
        localStorage,
        history
      })
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

render(
  createElement(
    Provider,
    { store },
    createElement(Router, { routes, history })
  ),
  window.document.getElementById('app')
);
