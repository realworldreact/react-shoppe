const products = require('../../seed/products.json');

const user = {
  id: '58c01fd125fd5d99b0d5640f',
  username: 'john doe',
  email: 'john@example.com',
  password: 'foobar'
};

module.exports = function seed(app) {
  const Product = app.models.Product;
  const User = app.models.User;
  // const AccessToken = app.models.AccessToken;

  Product.create(products, (err) => {
    if (err) { throw err; }
    console.log('products seeded');
  });

  User.create(user, (err) => {
    if (err) { throw err; }
    console.log('user created: ', user);
  });

};
