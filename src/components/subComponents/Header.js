import React from 'react';

import './subComponent.css'

const Header = React.createClass({

  displayName: 'Header',

  getInitialState() {
    return {
      subscriptionId: null
    };
  },
  
  render() {
    return (
    <div className="header-container">
        <p className='header'>Download/upload hastighed</p>
    </div>
    );
  },
});

module.exports = Header;
