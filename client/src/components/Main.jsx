import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { dropToken } from '../services/apiHelper';
import Register from './Register';

const Main = (props) => {
  return (
    <main>
      <Route exact path='/' render={() => (
          <div>
            <Register
              handleChange={props.handleChange}
              handleSubmit={props.handleRegister}
              username={props.username}
              email={props.email}
              password={props.password}
              value="Register"
              navLogin={props.navLogin}
              navRegister={props.navRegister}/>
          </div>
      )}/>
      <Route exact path='/login' render={() => (
          <div>
            <Register
              handleChange={props.handleChange}
              handleSubmit={props.handleLogin}
              username={props.username}
              email={props.email}
              password={props.password}
              value="Log In"
              navLogin={props.navLogin}
              navRegister={props.navRegister}/>
          </div>
      )}/>
      <Route exact path='/home' render={() => (
          <div>
            Hello
          </div>
      )}/>
    </main>
  )
}

export default withRouter(Main);
