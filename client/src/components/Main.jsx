import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Register from './Register';
import Home from './Home';
import Event from './Event';
import Chatroom from './Chatroom';
import Profile from './Profile';

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
      <Route exact path='/profile' render={() => (
        <Profile />
      )}/>
      <Route exact path='/events' render={() => (
        <Home
          events={props.events}
          navEvent={props.navEvent}/>
      )}/>
      <Route exact path='/events/:event_id' render={() => (
        <Event
          chatrooms={props.chatrooms}
          navChatroom={props.navChatroom}
          navHome={props.navHome}/>
      )}/>
      <Route exact path='/events/:event_id/chatrooms/:chatroom_id' render={() => (
        <Chatroom
          user={props.user}
          text={props.text}
          handleChangeText={props.handleChangeText}
          handleSubmitText={props.handleSubmitText}
          removePost={props.removePost}
          posts={props.posts}
          navBackEvent={props.navBackEvent}
          getUsers={props.getUsers}
          makeEditForm={props.makeEditForm}
          editFormId={props.editFormId}
          editText={props.editText}
          editPost={props.editPost}/>
      )}/>
    </main>
  )
}

export default withRouter(Main);
