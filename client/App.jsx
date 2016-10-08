import React, { PropTypes, Component } from 'react';
import Nav from './components/Nav.jsx';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Nav />
        <div className='app-child'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};
