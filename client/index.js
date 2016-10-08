import { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';

import routes from './routes.jsx';

render(
  createElement(Router, { routes, history }),
  window.document.getElementById('app')
);
