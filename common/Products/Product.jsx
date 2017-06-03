import React, { PropTypes } from 'react';

const propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string
};

export default function Product({ image, name, description }) {
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
          <button>
            <img src='/images/AddToCartUnselected.png' />
          </button>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = propTypes;
