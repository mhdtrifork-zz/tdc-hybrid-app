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
          <p className='header'>{this.props.header}</p>
          <div className='horizontal-container'>
            <p className='large-text'>{this.props.text}</p>
            <p className='large-text right'>{this.props.price}</p>
          </div>
        </div>
    </div>
    );
  },
});

module.exports = SubscriptionHeader;
