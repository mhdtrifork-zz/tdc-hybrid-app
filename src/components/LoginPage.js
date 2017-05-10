import React from 'react';
import Tappable from 'react-tappable';

import '../css/loginPage.css'

const LoginPage = React.createClass({

  displayName: 'LoginPage',

  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },
  
  parseResponse(responseJson) {
    const token = responseJson.token
    const selfServiceStack = responseJson.selfServiceStack
    this.props.navigateTo('Broadband', {token:token, selfServiceStack: selfServiceStack})
  },

  login() {
    this.props.startSpinner(true)
     fetch('https://odinapi.tdc.dk/apps/authenticate', {
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
      })
      .catch((error) => {
        this.props.startSpinner(false)
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
      </div>
    );
  },
});

module.exports = LoginPage;
