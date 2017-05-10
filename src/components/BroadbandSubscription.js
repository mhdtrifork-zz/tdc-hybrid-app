import React from 'react';
import Tappable from 'react-tappable';

import '../css/broadbandSubscription.css'

const BroadbandSubscription = React.createClass({

  displayName: 'BroadbandSubscription',

  getInitialState() {
    return {
      subscription: null,
    };
  },
  
  /*RenderRow(rowData) {
    switch(rowData.id) {
      case 'subscription':
        return (<SubscriptionCell header={rowData.header} price={rowData.price}/>)
        break
      case 'header':
        return (<HeaderCell header={rowData.header}/>)
        break
      case 'namePrice':
        return (<NamePriceCell text={rowData.text} price={rowData.price}/>)
        break
        case 'circle':
        return (<CircleGraph></CircleGraph>)
      default:
        return (
          <Text>
            {rowData.id}
          </Text>
        )
        break
    }
  },
                                                
   setupArray(subscription) {
    var array = []
    if (subscription.name !== null, subscription.price !== null) {
      array.push({id: 'subscription', header: subscription.name, price: subscription.price})
    }
    
    if (subscription.speed !== null) {
      array.push({id: 'header', header: subscription.speedHeader})
      array.push({id: 'namePrice', text: subscription.speed, price: ''})
    }
    
    if (subscription.addOns !== null) {
      if (subscription.addOns.length > 0) {
        array.push({id: 'header', header: subscription.addOnHeader})
      }
      subscription.addOns.forEach((addOn) => {
        array.push({id: 'namePrice', text: addOn.label, price: addOn.price})
      })
    }
    
    if (subscription.totalPrice !== null) {
      array.push({id: 'header', header: subscription.totalPriceHeader})
      array.push({id: 'namePrice', text: subscription.totalPriceLabel, 
                price: subscription.totalPrice})
    }
    
    array.push({id:'circle', percent:100})
    console.log("test"+array)
    this.setState({
      rows: array,
      dataSource: ds.cloneWithRows(array),
    })
  },*/
  
  parseBroadbandResponse(responseJson) {
    console.log(responseJson)
    this.setState({subscription: responseJson})
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
        this.parseBroadbandResponse(responseJson)
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
      return (
      <div className="broadband-page">
          <h1>test</h1>
      </div>
    );
  },
});

module.exports = BroadbandSubscription;
