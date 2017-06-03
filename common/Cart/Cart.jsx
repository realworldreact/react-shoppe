import React, { Component } from 'react';


export default class Cart extends Component {
  render() {
    const { cart } = this.props;
    const totalSum = cart.reduce((sum, item) => {
      return sum + item.totalItem;
    }, 0);
    return (
      <div className='cart'>
        <div className='cart-title'>
          <h2>My Cart</h2>
        </div>
        <div className='cart-list'>
          <div className='cart-list-row'>
            <div className='cart-list-item'>
              Item
            </div>
            <div className='cart-list-item'>
              Qty
            </div>
            <div className='cart-list-item'>
              Price
            </div>
            <div className='cart-list-item' />
          </div>
          { cart.map(({ count, image, name, price, totalItem }) => {
            return (
              <div className="cart-list-row">
                <div className="cart-list-item cart-list-product">
                  <div className="cart-list-stock-photo">
                    <img src={ '/images/products/' + image } />
                  </div>
                  <div className="cart-list-info">
                    <div className="cart-list-info-name">
                      { name }
                    </div>
                    <div className="cart-list-info-name">
                      $ { price }
                    </div>
                  </div>
                </div>
                <div className="cart-list-item cart-count-item">
                  <div className="cart-count-up">
                    <img src="/images/cart/AddOneItem.png" />
                  </div>
                  <div className="cart-count-count">
                    { count }
                  </div>
                  <div className="cart-count-down"><img src="/images/cart/SubtractOneItem.png" /></div>
                </div>
                <div className="cart-list-item">
                  $ { totalItem }
                </div>
                <div className="cart-list-item cart-delete-item"><img src="/images/cart/DeleteItem.png" /></div>
              </div>
            );
          }) }
          <div className='cart-list-row'>
            <div className='cart-list-item' />
            <div className='cart-list-item' />
            <div className='cart-list-item'>
              Total
            </div>
            <div className='cart-list-item'>
              $ { totalSum }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
