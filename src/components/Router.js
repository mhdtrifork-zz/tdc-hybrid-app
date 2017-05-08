import React from 'react';
import LoginPage from './LoginPage'
import Spinner from './Spinner';

const Router = React.createClass({

  displayName: 'Router',

  getInitialState() {
    return {
      spinning: false,
      currentComponent: '',
    };
  },
  
  navigateTo(destination) {
    this.setState({currentComponent: destination})
    console.log(this.state.currentComponent)
  },
  
  startSpinner(start) {
    this.setState({spinning: start})
  },
  
  render() {
    var spinnerOverlay = <div/>
    if (this.state.spinning) {
      spinnerOverlay = 
        <div className="login-overlay">
          <Spinner className="spinner"/>
        </div>
    }
    switch (this.state.currentComponent) {
        case 'Broadband':
        console.log('test3')
          return(<div>
              {spinnerOverlay}
            </div>);
          break
        default:
          console.log('test4')
          return(<div>
              <LoginPage navigateTo={this.navigateTo} startSpinner={this.startSpinner}></LoginPage>
              {spinnerOverlay}
            </div>);
          break
    }
  },
});

module.exports = Router;
