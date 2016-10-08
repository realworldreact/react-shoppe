import React, { PropTypes } from 'react';

export default class Input extends React.Component {
  constructor(...props) {
    super(...props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.props.handleInput(e.target.value);
  }

  render() {
    return (
      <div className='products-search'>
        <input
          className='products-search_input'
          onChange={ this.handleInput }
        />
      </div>
    );
  }
}

Input.propTypes = {
  handleInput: PropTypes.func.isRequired
};
