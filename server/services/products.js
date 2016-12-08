export default function loadProductsServices(app) {
  const { Product } = app.models;
  return {
    name: 'products',
    read(req, resource, params, config, cb) {
      Product.find()
        .then(products => products.map(product => product.toJSON()))
        .then(products => cb(null, products))
        .catch(cb);
    }
  };
}
