import React from 'react';
import Tappable from 'react-tappable';
import Spinner from './Spinner';

import '../css/loginPage.css'

import Message from './Message';

const LoginPage = React.createClass({

  displayName: 'LoginPage',

  getInitialState() {
    return {
      loading: false,
      username: '',
      password: '',
    };
  },
  
  parseResponse(responseJson) {
    const token = responseJson.token
    const selfServiceStack = responseJson.selfServiceStack
    console.log(token)
    console.log(selfServiceStack)
  },

  login() {
    this.setState({loading: true})
     fetch('http://odinapps.master.test.internal.tdc.dk/apps/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        userName: this.state.username,
        password: this.state.password,
      })
     })
      .then((response) => response.json())
      .then((responseJson) => {
        this.parseResponse(responseJson)
        this.setState({loading: false})
      })
      .catch((error) => {
        this.setState({loading: false})
        console.error(error)
      });
  },
  
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  },
  
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  },
  
  render() {
    var spinnerOverlay = <div/>
        if (this.state.loading) {
          spinnerOverlay = 
            <div className="login-overlay">
              <Spinner className="spinner"/>
            </div>
      }
      return (
      <div className="login-page">
        <div className="container">
          <h1 className="yousee-header">youSee</h1>
          <input className="input-field" type="text" value={this.state.value} onChange={this.handleUsernameChange} />
          <input className="input-field" type="password" value={this.state.value} onChange={this.handlePasswordChange} />
          <Tappable
            className='button-green'
            onTap={ () => this.login()}
            >Log ind</Tappable>
        </div>
        <div>
        {spinnerOverlay}
      </div>
      </div>
    );
  },
});

module.exports = LoginPage;
