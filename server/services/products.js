export default function productsFactory(Product) {
  return {
    name: 'products',
    read(req, resource, params, config, cb) {
      Product.find()
        .then(
          products => cb(null, products.map(product => product.toJSON()))
        )
        .catch(cb);
    }
  };
}
