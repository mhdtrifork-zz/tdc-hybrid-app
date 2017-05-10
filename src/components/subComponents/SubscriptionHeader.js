import React from 'react';

import './subComponent.css'

const SubscriptionHeader = React.createClass({

  displayName: 'SubscriptionHeader',

  getInitialState() {
    return {
      subscriptionId: null
    };
  },
  
  render() {
    return (
    <div className="subscription-header-container">
        <div className='vertical-container'>
          <p className='header'>BlandSelv 25/5 Mbit</p>
          <div className='horizontal-container'>
            <p className='large-text'>Pris</p>
            <p className='large-text right'>219 kr. /md.</p>
          </div>
        </div>
    </div>
    );
  },
});

module.exports = SubscriptionHeader;
