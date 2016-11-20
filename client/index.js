import { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ThunkMiddleware from 'redux-thunk';

import reducer from './redux.js';
import routes from './routes.jsx';

const devToolsExt = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__() ||
  (x => x);


const middlewareStoreEnchance = applyMiddleware(
  ThunkMiddleware
);

const finalStoreEnhancer = compose(
  middlewareStoreEnchance,
  devToolsExt
);

const store = createStore(
  reducer,
  finalStoreEnhancer
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
