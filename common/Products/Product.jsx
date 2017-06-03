import React, { PropTypes } from 'react';

const propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  isInCart: PropTypes.bool,
  name: PropTypes.string,
  description: PropTypes.string,
  handleClick: PropTypes.func
};

export default function Product({
  id,
  image,
  isInCart,
  name,
  description,
  handleClick
}) {
  const cartImage = isInCart ? 'Selected' : 'Unselected';
  return (
    <div className='products-item'>
      <div className='products-item-stock-photo'>
        <img src={ '/images/products/' + image } />
      </div>
      <div className='products-item-name'>
        { name }
      </div>
      <div className='products-item-description'>
        { description }
      </div>
      <div className='products-item-footer'>
        <div className='products-item-cart'>
          <button onClick={ () => handleClick(id) }>
            <img src={ '/images/AddToCart' + cartImage + '.png' } />
          </button>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = propTypes;
