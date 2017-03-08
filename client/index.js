import { createElement } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';

import routes from './routes.jsx';
import reducer from './redux.js';

const middlewareStoreEnhancer = applyMiddleware(
  thunkMiddleware.withExtraArgument({
    localStorage
  })
);

const devToolStoreEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__() ||
  ((x) => x);

const store = createStore(
  reducer,
  compose(middlewareStoreEnhancer, devToolStoreEnhancer)
);
// <Provider store={ store }>
//   <Router routes={ routes} />
// </Provider>
render(
  createElement(
    Provider,
    { store: store },
    createElement(Router, { routes, history }),
  ),
  window.document.getElementById('app')
);
