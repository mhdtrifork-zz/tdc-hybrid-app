import React from 'react';
import LoginPage from './LoginPage'
import Broadband from './Broadband'
import Spinner from './Spinner';

import BroadbandSubscription from './Broadband'

const Router = React.createClass({

  displayName: 'Router',

  getInitialState() {
    return {
      spinning: false,
      currentComponent: '',
      componentProps: null,
    };
  },
  
  navigateTo(destination, props) {
    this.setState({currentComponent: destination, componentProps: props})
    this.startSpinner(false)
  },
  
  startSpinner(start) {
    this.setState({spinning: start})
  },
  
  render() {
    var spinnerOverlay = <div/>
    if (this.state.spinning) {
      spinnerOverlay = 
        <div className="login-overlay">
          <Spinner/>
        </div>
    }
    switch (this.state.currentComponent) {
        case 'Broadband':
          return(<div>
              <Broadband 
                navigateTo={this.navigateTo} 
                startSpinner={this.startSpinner} 
                initialProps={this.state.componentProps}> 
              </Broadband>
              {spinnerOverlay}
            </div>);
          break
        default:
          return(<div>
              <LoginPage 
                navigateTo={this.navigateTo} 
                startSpinner={this.startSpinner}>
              </LoginPage>
              {spinnerOverlay}
            </div>);
          break
    }
  },
});

module.exports = Router;
