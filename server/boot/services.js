import Fetcher from 'fetchr';

module.exports = function services(app) {
  const { Product } = app.models;
  const productsSevice = {
    name: 'products',
    read: (req, resource, params, config, cb) => {
      console.log('foobar');
      Product.find({})
        .then(products => {
          return products.map(product => product.toJSON());
        })
        .then(products => {
          return cb(null, products);
        })
        .catch(err => cb(err));
    }
  };
  Fetcher.registerService(productsSevice);
};
