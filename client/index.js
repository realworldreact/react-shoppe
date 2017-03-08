import { createElement } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';

import routes from './routes.jsx';
import reducer from './redux.js';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
