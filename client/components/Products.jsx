import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addToFav,
  addToCart,
  updateFilter
} from '../redux.js';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  addToCart: PropTypes.func,
  updateFilter: PropTypes.func,
  filter: PropTypes.string,
  addToFav: PropTypes.func
};

// products: this.state.products
  // .filter(
    // ({ name }) => (new RegExp(this.state.filter)).test(name)
  // )

function mapStateToProps(state) {
  return {
    filter: state.filter,
    products: state.products
      .map(product => {
        const isInCart = state.cart.some(item => {
          return item.id === product.id;
        });
        const isFav = state.favs.some(itemId => {
          return itemId === product.id;
        });
        if (isInCart || isFav) {
          return {
            ...product,
            isInCart,
            isFav
          };
        }
        return product;
      })
  };
}

const mapDispatchToProps = {
  updateFilter,
  addToCart,
  addToFav
};

export class Products extends Component {
  render() {
    const { addToCart, addToFav, products } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input
            className='products-search_input'
            onChange={ (e) => this.props.updateFilter(e.target.value) }
            value={ this.props.filter }
          />
        </div>
        <ul className='products-lists'>
          { products.map((product) => {
            const cartImg = product.isInCart ? 'Selected' : 'Unselected';
            const favImg = product.isFav ? 'Selected' : 'Unselected';
            return (
              <li
                className='products-item'
                key={ product.id }
                >
                <img
                  className='products-item-stock-photo'
                  src={ `/images/products/${product.image}` }
                />
                <div className='products-item-name'>
                  { product.name }
                </div>
                <div className='products-item-descriptions'>
                  { product.description }
                </div>
                <div className='products-item-footer'>
                  <div className='products-item-cart'>
                    <button onClick={ () => addToCart(product.id) }>
                      <img src={`/images/AddToCart${cartImg}.png`} />
                    </button>
                  </div>
                  <div className='products-item-favorite'>
                    <button onClick={ () => addToFav(product.id) }>
                      <img
                        src={ `/images/HeartItem${favImg}.png`}
                      />
                    </button>
                  </div>
                </div>
              </li>
            );
          })
          }
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

Products.displayName = 'Products';
Products.propTypes = propTypes;
