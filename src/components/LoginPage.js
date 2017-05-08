import React from 'react';
import Tappable from 'react-tappable';

import '../css/loginPage.css'

import Message from './Message';

const LoginPage = React.createClass({

  displayName: 'LoginPage',

  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },

  login() {
    // CSSTransitionGroup will fade this in
    console.log(this.state.username)
    console.log(this.state.password)
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
