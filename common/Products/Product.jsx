import React, { PropTypes } from 'react';

const propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  handleClick: PropTypes.func
};

export default function Product({
  id,
  image,
  name,
  description,
  handleClick
}) {
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
            <img src='/images/AddToCartUnselected.png' />
          </button>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = propTypes;
