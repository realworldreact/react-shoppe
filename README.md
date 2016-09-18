# Advance Redux

## User Stories

#### As a user, I can...
* sign up
* log in
* view all the products on one page
* search the products
* favorite specific products
* add products to my cart
* view my cart
* increase the item quantity of a specific product from my cart
* see price changes reactively with quantity changes in my cart
* remove an item from my cart

Auth Bonus

* if I have previously signed in on page refresh I am still logged in
* Sign out (with corresponding UI elements)

## Backend API

Our API is built using [Loopback.js](https://github.com/strongloop/loopback)
To see all of the available REST API endpoints take a look at the explorer [localhost:3000/explorer](localhost:3000/explorer)

Below are the main API endpoints you will use for this app

### Auth

Create a new user (will also provide an access token)
POST /api/users
BODY
```
{
  username: String,
  email: String,
  password: String
}
```

returns the user object on success (see: [server/models/user.json](server/models/user.json) for the schema) with attached access token

RETURNS
```
{
  id: String,
  email: String,
  username: String,
  cart: [],
  favs: [],
  accessToken: String
}
```

sign in

POST /api/users/login?include=user
BODY {
  email,
  password
}

RETURNS
```js
{
  user: User,
  id: String, // accessToken
}
```

### Products

see [server/models/product.json](server/models/product.json) for Product schema

Get the list of products available

GET /api/products
RETURNS

```js
[Product, Product, ...Product]

```

### Cart

Access users cart through the users API

**Add an item to the users cart**
GET /api/users/:userId/add-to-cart?access_token=${accessToken}
BODY
```js
{
  itemId: String // the id of the product to add to the cart
}
```

RETURNS
```js
{
  cart: [ ...{ id: String, count: Number } ]
}
```

returns the updated cart. Use this information to ensure your clients cart is up
to date with your server


**Remove an item from the users cart**
GET /api/users/:userId/remove-from-cart?access_token=${accessToken}
BODY
```js
{
  itemId: String // the id of the product
}
```

RETURNS
```
{
  cart: [ ...{ id: String, count: Number } ]
}
```

returns the updated cart. Use this information to ensure your clients cart is up
to date with your server

**delete an item from the users cart**
GET /api/users/:userId/delete-form-cart?access_token=${accessToken}

BODY
```js
{
  itemId: String // the id of the product
}
```

RETURNS
{
  cart: [ ...{ id: String, count: Number } ]
}

returns the updated cart. Use this information to ensure your clients cart is up
to date with your server

### Favorite
Access users favs through the users API

GET /api/users/:userId/fav?access_token=${accessToken}
BODY
```js
{
  itemId: String // the id of the product
}
```
RETURNS

```
{
  fav: [ itemId, itemId, ...itemId ]
}
```
Use this return to update clients favs.

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


## Useful docs

* [loopback user docs](https://docs.strongloop.com/display/APIC/User+REST+API)
* [Redux Docs](http://redux.js.org/docs/)
* [Redux-thunk](https://github.com/gaearon/redux-thunk)
* [react-redux-router](https://github.com/reactjs/react-router-redux)
