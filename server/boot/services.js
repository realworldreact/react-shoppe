import Fetcher from 'fetchr';

export default function services(app) {
  const router = app.loopback.Router();
  const Product = app.models.Product;
  router.use('/services', Fetcher.middleware());
  const productServices = {
    name: 'products',
    read: function(req, resource, params, config, callback) {
      Product.find({})
        .then(products => products.map(product => product.toJSON()))
        .then(products => {
          callback(null, products);
        })
        .catch(err => callback(err));
    }
  };
  Fetcher.registerService(productServices);

  app.use(router);
}
