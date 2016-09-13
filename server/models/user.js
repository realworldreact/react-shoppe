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

  User.prototype.addToCart = function addToCart(itemId, count = 1) {
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
        console.log('item: ', product._id);
        const newCart = [ ...user.cart ];
        const index = _.findIndex(newCart, item => item.id === product.id);
        if (index !== -1) {
          const oldItem = newCart[index];
          newCart[index] = { ...oldItem, count: oldItem.count + count };
        } else {
          newCart.push({
            id: product.getId(),
            count
          });
        }
        const updateData = { cart: newCart };
        return user.updateTo(updateData)
          .then(() => {
            return updateData;
          });
      });
  };

  User.prototype.removeFromCart = function removeFromCart(itemId, count = 1) {
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
        console.log('item: ', product._id);
        const newCart = [ ...user.cart ];
        const index = _.findIndex(newCart, item => item.id === product.id);
        if (index !== -1) {
          const oldItem = newCart[index];
          newCart[index] = {
            ...oldItem,
            count: Math.max(oldItem.count - count, 0)
          };
        } else {
          newCart.push({
            id: product.getId(),
            count
          });
        }
        const updateData = { cart: newCart};
        return user.updateTo(updateData)
          .then(() => {
            return updateData;
          });
      });
  };

  User.remoteMethod(
    'addToCart',
    {
      isStatic: false,
      description: 'updates the users cart with item',
      accepts: [
        {
          arg: 'productId',
          type: 'string',
          required: true
        },
        {
          arg: 'count',
          type: 'number',
          required: false
        }
      ],
      returns: [
        {
          arg: 'status',
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
          arg: 'productId',
          type: 'string',
          required: true
        },
        {
          arg: 'count',
          type: 'number',
          required: false
        }
      ],
      returns: [
        {
          arg: 'status',
          type: 'object'
        }
      ],
      http: {
        path: '/remove-from-cart',
        verb: 'POST'
      }
    }
  );
};
