import React from 'react';
import Tappable from 'react-tappable';
import SubscriptionHeader from './subComponents/SubscriptionHeader'
import Header from './subComponents/Header'
import InfoAndPrice from './subComponents/InfoAndPrice'
import Separator from './subComponents/Separator'
import Spinner from './Spinner'

import '../css/broadbandSubscription.css'

const BroadbandSettings = React.createClass({

  displayName: 'BroadbandSettings',

  getInitialState() {
    return {
      settings: null,
    };
  },
                                                
   setupArray(settings) {
    var array = []
    if (settings.settinggroups !== null) {
      settings.settinggroups.forEach((settingGroup) => {
        if (settingGroup.settings !== null) {
          settingGroup.settings.forEach((setting) => {
            switch(setting.id) {
              case "NETWORK_NAME":
                array.push(<Header text='Netværksnavn (mit Wi-Fi)'></Header>)
                array.push(<Separator margin={true}/>)
                array.push(<Separator margin={true}/>)
                array.push(<InfoAndPrice text={setting.value} price=''></InfoAndPrice>)
                array.push(<Separator margin={true}/>)
                array.push(<Separator margin={true}/>)
                break
              case "NETWORK_KEY":
                array.push(<Header text='Netværksnøgle (adgangskode)'></Header>)
                array.push(<Separator margin={true}/>)
                array.push(<Separator margin={true}/>)
                array.push(<InfoAndPrice text={setting.value} price=''></InfoAndPrice>)
                array.push(<Separator margin={true}/>)
                array.push(<Separator margin={true}/>)
                break
              case "NETWORK_CHANNEL_2_4":
                array.push(<Header text='Netværkskanal 2,4 GHz'></Header>)
                array.push(<Separator margin={true}/>)
                array.push(<Separator margin={true}/>)
                array.push(<InfoAndPrice text={setting.value} price=''></InfoAndPrice>)
                array.push(<Separator margin={true}/>)
                array.push(<Separator margin={true}/>)
                break
              case "NETWORK_CHANNEL_5":
                array.push(<Header text='Netværkskanal 5 GHz'></Header>)
                array.push(<Separator margin={true}/>)
                array.push(<Separator margin={true}/>)
                array.push(<InfoAndPrice text={setting.value} price=''></InfoAndPrice>)
                array.push(<Separator margin={true}/>)
                array.push(<Separator margin={true}/>)
                break
            }
          })
        }
      })
    }
    return array
  },
  
  getBroadbandSubscribtionWith(id, selfServiceStack, token) {
    fetch('https://odinapi.tdc.dk/apps/subscriptions/broadband/'+id+'/settings', {
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
      console.log(responseJson)
        this.setState({settings: responseJson})
      })
      .catch((error) => {
        console.error(error)
      });
  },
  
  shouldFetchSubscription() {
    if (this.props.id !== null && this.state.settings === null) {
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
    
    if (this.state.settings === null) {
      return (
        <div className="spinner-overlay">
          <Spinner/>
        </div>
      );
    } else {
      return (
        <div className="broadband-subscription-page">
            {this.setupArray(this.state.settings)}
        </div>
      );
    } 
  },
});

module.exports = BroadbandSettings;
