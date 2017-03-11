module.exports = function(app) {
  const { Product } = app.models;
  return {
    name: 'products',
    read: function(req, resource, params, config, callback) {
      return Product.find({})
        .then(products => products.map(product => product.toJSON()))
        .then(products => {
          callback(null, products);
        })
        .catch(callback);
    }
  };
};
