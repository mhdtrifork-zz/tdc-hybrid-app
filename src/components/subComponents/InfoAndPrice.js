import React from 'react';

import './subComponent.css'

const InfoAndPrice = React.createClass({

  displayName: 'InfoAndPrice',

  getInitialState() {
    return {
      subscriptionId: null
    };
  },
  
  render() {
    return (
    <div className="info-and-price-container">
        <div className='horizontal-container'>
          <p className='normal-text'>{this.props.text}</p>
          <p className='normal-text right'>{this.props.price}</p>
        </div>
    </div>
    );
  },
});

module.exports = InfoAndPrice;
