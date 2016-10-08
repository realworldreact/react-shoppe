import React, { cloneElement, PropTypes, Component } from 'react';
import Nav from './Nav.jsx';

export default class App extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      user: null
    };
    this.addUser = this.addUser.bind(this);
  }

  addUser(user = {}) {
    this.setState({ user });
  }

  render() {
    return (
      <div className='app'>
        <Nav />
        <div className='app-child'>
          {
            cloneElement(
              this.props.children,
              {
                addUser: this.addUser
              }
            )
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};
