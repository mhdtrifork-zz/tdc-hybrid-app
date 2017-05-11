import React from 'react';
import BroadbandSubscription from './BroadbandSubscription'

import '../css/broadband.css'

const Broadband = React.createClass({

  displayName: 'Broadband',

  getInitialState() {
    return {
      subscriptionId: null
    };
  },
  
  parseDashboardResponse(responseJson) {
    responseJson.some((subscription) => {
      if (subscription.type !== undefined) {
        if (subscription.type === "Broadband") {
          this.setState({subscriptionId: subscription.id})
          return true
        } else {
          return false
        }
      }
    })
  },

  getDashboard(selfServiceStack, token) {
     fetch('https://odinapi.tdc.dk/apps/dashboard', {
      method: 'GET',
      headers: {
        'X-TDC-SelfServiceStack': selfServiceStack,
        'Authorization': 'Bearer '+token,
        'X-TDC-SELFAPP-PLATFORM': 'iOS',
        'X-TDC-SELFAPP-VERSION': '5.5.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        /*'X-TDC-YSPRO-INSTANCE': 'prod',
        'X-TDC-MBILLING-INSTANCE': 'prod',
        'X-TDC-KASIA-INSTANCE': 'prod',
        'X-TDC-TAYS-INSTANCE': 'prod',
        'Cookie': 'BcInstance=bcprod',*/
        'cache-control': 'no-cache'
      }
     })
      .then((response) => response.json())
      .then((responseJson) => {
        this.parseDashboardResponse(responseJson)
      })
      .catch((error) => {

        console.error(error)
      });
  },
  
  render() {
    if (this.state.subscriptionId ===null) {
      this.getDashboard(this.props.initialProps.selfServiceStack, 
                     this.props.initialProps.token)
    }
      return (
      <div className="broadband-page">
          <div className='broadband-header-container'>
            <p className='broadband-header'>Mit Bredbånd</p>
          </div>
          <BroadbandSubscription 
            id={this.state.subscriptionId} 
            selfServiceStack={this.props.initialProps.selfServiceStack}
            token={this.props.initialProps.token}>
          </BroadbandSubscription>
      </div>
    );
  },
});

module.exports = Broadband;
