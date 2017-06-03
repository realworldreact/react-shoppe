import { createElement } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../common/App.jsx';

const win = typeof window !== 'undefined' ? window : {};
const container = win.document.getElementById('app');

// <Router>
//  <App />
// </Router>
render(
  createElement(
    Router,
    null,
    createElement(App)
  ),
  container
);
