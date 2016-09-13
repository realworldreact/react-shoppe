/* eslint-disable no-process-exit */
const { bindNodeCallback } = require('rxjs/observable/bindNodeCallback');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/do');
const products = require('./products.json');
const app = require('../server/server');

const Product = app.models.Product;

const destroyProducts = bindNodeCallback(Product.destroyAll.bind(Product));
const createProducts = bindNodeCallback(Product.create.bind(Product));

console.log('\nclear previous products\n');
destroyProducts()
  .do(() => console.log('\ncreating new products\n'))
  .switchMap(() => createProducts(products))
  .subscribe(
    () => {},
    err => { throw err; },
    () => process.exit(0)
  );
