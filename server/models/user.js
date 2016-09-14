import _ from 'lodash';

module.exports = function(User) {
  User.prototype.updateTo = function update$(updateData) {
    const id = this.getId();
    const updateOptions = { allowExtendedOperators: true };
    if (
        !updateData ||
        typeof updateData !== 'object' ||
        !Object.keys(updateData).length
    ) {
      return Promise.reject(new Error(
        `
          updateData must be an object with at least one key,
          but got ${updateData} with ${Object.keys(updateData).length}
        `.split('\n').join(' ')
      ));
    }
    console.log('updating user: ', id);
    console.log('update data: ', updateData);
    return this.constructor.updateAll({ id }, updateData, updateOptions);
  };

  User.prototype.addToCart = function addToCart(itemId) {
    const user = this;
    const { Product } = User.app.models;
    // validate item is actual product
    return Product.findById(itemId)
      .then(product => {
        if (!product) {
          throw new Error(`no product found with id ${itemId}.`);
        }
        return product;
      })
      .then(product => {
        console.log('item: ', product.getId());
        const newCart = [ ...user.cart ];
        const index = _.findIndex(newCart, item => item.id === product.id);
        if (index !== -1) {
          const oldItem = newCart[index];
          newCart[index] = { ...oldItem, count: oldItem.count + 1 };
        } else {
          newCart.push({
            id: product.getId(),
            count: 1
          });
        }
        const updateData = { cart: newCart };
        return user.updateTo(updateData).then(() => newCart);
      });
  };

  User.prototype.removeFromCart = function removeFromCart(itemId) {
    const user = this;
    const { Product } = User.app.models;
    // validate item is actual product
    return Product.findById(itemId)
      .then(product => {
        if (!product) {
          throw new Error(`no product found with id ${itemId}.`);
        }
        return product;
      })
      .then(product => {
        console.log('item: ', product.getId());
        const newCart = [ ...user.cart ];
        const index = _.findIndex(newCart, item => item.id === product.id);
        if (index !== -1) {
          const oldItem = newCart[index];
          newCart[index] = {
            ...oldItem,
            count: Math.max(oldItem.count - 1, 0)
          };
          const updateData = { cart: newCart};
          return user.updateTo(updateData).then(() => newCart);
        }
        // item is not in cart so we do not save any data
        return newCart;
      });
  };

  User.prototype.deleteFromCart = function deleteFromCart(itemId) {
    const user = this;
    const { Product } = User.app.models;
    // validate item is actual product
    return Product.findById(itemId)
      .then(product => {
        if (!product) {
          throw new Error(`no product found with id ${itemId}.`);
        }
        return product;
      })
      .then(product => {
        console.log('item: ', product.getId());
        const newCart = [ ...user.cart ];
        const index = _.findIndex(newCart, item => item.id === product.id);
        if (index !== -1) {
          newCart.splice(index, 1);
          const updateData = { cart: newCart};
          return user.updateTo(updateData).then(() => newCart);
        }
        // we do not need to update user list here
        // since item was not in cart
        return newCart;
      });
  };

  const getItemId = ({ req }) => {
    console.log('body: ', req.body);
    return req.body.itemId;
  };

  User.remoteMethod(
    'addToCart',
    {
      isStatic: false,
      description: 'updates the users cart with item',
      accepts: [
        {
          arg: 'itemId',
          type: 'string',
          required: true,
          http: getItemId
        }
      ],
      returns: [
        {
          arg: 'cart',
          type: 'object'
        }
      ],
      http: {
        path: '/add-to-cart',
        verb: 'POST'
      }
    }
  );

  User.remoteMethod(
    'removeFromCart',
    {
      isStatic: false,
      description: 'removes the item from users cart',
      accepts: [
        {
          arg: 'itemId',
          type: 'string',
          required: true,
          http: getItemId
        }
      ],
      returns: [
        {
          arg: 'cart',
          type: 'object'
        }
      ],
      http: {
        path: '/remove-from-cart',
        verb: 'POST'
      }
    }
  );

  User.remoteMethod(
    'deleteFromCart',
    {
      isStatic: false,
      description: 'deletes the item from users cart',
      accepts: [
        {
          arg: 'itemId',
          type: 'string',
          required: true,
          http: getItemId
        }
      ],
      returns: [
        {
          arg: 'cart',
          type: 'object'
        }
      ],
      http: {
        path: '/delete-from-cart',
        verb: 'POST'
      }
    }
  );
};
