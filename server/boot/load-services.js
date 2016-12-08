import Fetcher from 'fetchr';
import loadProducts from '../services/products.js';

module.exports = function loadServices(app) {
  app.use('/services', Fetcher.middleware());
  const productsConfig = loadProducts(app);
  Fetcher.registerService(productsConfig);
};
