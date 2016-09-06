import { createElement } from 'react';
import { render } from 'react-dom';
import App from '../common/App.jsx';

render(
  createElement(App),
  window.document.getElementById('app')
);
