import App from './components/App.jsx';
import Products from './components/Products.jsx';
import childRoutes from './routes/index.js';

export default {
  path: '/',
  component: App,
  indexRoute: { component: Products },
  childRoutes
};
