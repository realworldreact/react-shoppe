# Advance Redux

## User Stories

#### As a user, I can...
* sign up
* log in
* view all the products on one page
* search the products
* favorite specific products
* add products to my cart
* see the product count in the cart icon
* view my cart
* increase the item quantity of a specific product from my cart
* see price changes reactively with quantity changes in my cart
* remove an item from my cart


## To start development
To seed the database for the first time

```
npm run seed
```
then run

```bash
npm start
```

This will create a .env file in the root directory and start the default gulp
task.

The default gulp task will

* Compile stylus files to css.
* Compile React app with WebPack
* Launch nodemon which will intern manage the LoopBack server
* Launch `webpack-dev-server` with Hot Reloading and React Hot Loader
* Launch BrowserSync which will manage injecting css and webpack build
