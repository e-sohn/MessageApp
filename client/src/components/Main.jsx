import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { dropToken } from '../services/apiHelper';
import Register from './Register';
import Home from './Home';
import Event from './Event';
import Chatroom from './Chatroom';

const Main = (props) => {
  return (
    <main>
      <Route exact path='/' render={() => (
          <Register
            handleChange={props.handleChange}
            handleSubmit={props.handleRegister}
            username={props.username}
            email={props.email}
            password={props.password}
            value="Register"
            navLogin={props.navLogin}
            navRegister={props.navRegister}/>
      )}/>
      <Route exact path='/login' render={() => (
          <Register
            handleChange={props.handleChange}
            handleSubmit={props.handleLogin}
            username={props.username}
            email={props.email}
            password={props.password}
            value="Log In"
            navLogin={props.navLogin}
            navRegister={props.navRegister}/>
      )}/>
      <Route exact path='/home' render={() => (
        <Home
          events={props.events}
          navEvent={props.navEvent}/>
      )}/>
      <Route exact path='/events/:event_id' render={() => (
        <Event
          chatrooms={props.chatrooms}
          navChatroom={props.navChatroom}/>
      )}/>
      <Route exact path='/events/:event_id/chatrooms/:chatroom_id' render={() => (
        <Chatroom
          posts={props.posts}/>
      )}/>
    </main>
  )
}

export default withRouter(Main);
