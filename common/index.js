import App from './App.jsx';
import childRoutes from './routes';
import Products from './routes/products/Products.jsx';

export default {
  component: App,
  indexRoute: { component: Products },
  path: '/',
  ...childRoutes
};
