import Fetcher from 'fetchr';
import productsFactory from '../services/products.js';

module.exports = function bootServices(app) {
  const { Product } = app.models;

  Fetcher.registerFetcher(productsFactory(Product));

  app.use('/services', Fetcher.middleware());
};
