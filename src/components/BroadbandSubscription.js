import React from 'react';
import Tappable from 'react-tappable';
import SubscriptionHeader from './subComponents/SubscriptionHeader'
import Header from './subComponents/Header'
import InfoAndPrice from './subComponents/InfoAndPrice'
import Separator from './subComponents/Separator'
import Spinner from './Spinner'

import '../css/broadbandSubscription.css'

const BroadbandSubscription = React.createClass({

  displayName: 'BroadbandSubscription',

  getInitialState() {
    return {
      subscription: null,
    };
  },
                                                
   setupArray(subscription) {
    var array = []
    if (subscription.name !== null, subscription.price !== null) {
      array.push(<SubscriptionHeader 
              header={subscription.name} 
              text='Pris' 
              price={subscription.price}></SubscriptionHeader>)
      array.push(<Separator/>)
    }
    
    if (subscription.speed !== null) {
      array.push(<Header text='Download/upload hastighed'></Header>)
      array.push(<Separator margin={true}/>)
      array.push(<Separator margin={true}/>)
      array.push(<InfoAndPrice text={subscription.speed} price=''></InfoAndPrice>)
      array.push(<Separator margin={true}/>)
      array.push(<Separator margin={true}/>)
    }
    
    if (subscription.addOns !== null) {
      if (subscription.addOns.length > 0) {
        array.push(<Header text='Mine tilvalg'></Header>)
        array.push(<Separator margin={true}/>)
      }
      subscription.addOns.forEach((addOn) => {
        array.push(<InfoAndPrice text={addOn.label} price={addOn.price}></InfoAndPrice>)
        array.push(<Separator margin={true}/>)
      })
    }
     return array
  },
  
  getBroadbandSubscribtionWith(id, selfServiceStack, token) {
    fetch('https://odinapi.tdc.dk/apps/subscriptions/broadband/'+id+'/frontpage', {
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
        this.setState({subscription: responseJson})
      })
      .catch((error) => {
        console.error(error)
      });
  },
  
  shouldFetchSubscription() {
    if (this.props.id !== null && this.state.subscription === null) {
      return true
    } else {
      return false
    }
  },

  render() {
    if (this.shouldFetchSubscription()){
      this.getBroadbandSubscribtionWith(this.props.id, 
                                        this.props.selfServiceStack, 
                                        this.props.token)
    }
    
    if (this.state.subscription === null) {
      return (
        <div className="spinner-overlay">
          <Spinner/>
        </div>
      );
    } else {
      return (
        <div className="broadband-subscription-page">
            {this.setupArray(this.state.subscription)}
        </div>
      );
    } 
  },
});

module.exports = BroadbandSubscription;
