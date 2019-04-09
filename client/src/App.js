import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { loginUser, createUser, updateToken, getEvents, getChatrooms, getPosts } from './services/apiHelper';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email:'',
        id: '',
      },
      registerForm: {
        username: '',
        email: '',
        password: ''
      },
      events: [],
      chatrooms: [],
      posts: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.navLogin = this.navLogin.bind(this);
    this.navRegister = this.navRegister.bind(this);
    this.navEvent = this.navEvent.bind(this);
    this.navChatroom = this.navChatroom.bind(this);

  }

  async componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      const user = decode(token);
      this.setState({
        user
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.props.history.push(`/home`);
      const events = await getEvents();
      this.setState({
        events
      })
    }
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      registerForm: {
        ...prevState.registerForm,
        [name]: value
      }
    }))
  }

  async handleRegister(ev) {
    ev.preventDefault();
    const newUser = await createUser({
      email: this.state.registerForm.email,
      username: this.state.registerForm.username,
      password: this.state.registerForm.password
    });

    const user = decode(newUser.token);
    await updateToken(newUser.token);
    const events = await getEvents();

    this.setState({
      registerForm: {
        username: '',
        email: '',
        password: ''
      },
      user,
      events
    });
    this.props.history.push(`/home`);
  }

  async handleLogin(ev) {
    ev.preventDefault();
    const user = await loginUser({
      email: this.state.registerForm.email,
      password: this.state.registerForm.password
    });

    const userInfo = decode(user.token);
    await updateToken(user.token);
    const events = await getEvents();

    this.setState({
      registerForm: {
        username: '',
        email: '',
        password: ''
      },
      user: userInfo,
      events
    });
    this.props.history.push(`/home`);
  }

  handleLogout() {
    this.setState({
      user: {
        username: '',
        email:'',
        id: '',
      },
      events: [],
      chatrooms: [],
      posts: []
    })
  }

  async navChatroom(chatroomId) {
    const posts = await getPosts(chatroomId);
    const eventString = this.props.history.location.pathname;
    const eventId = eventString.match(/\d+/g).map(Number)[0];
    this.setState({
      posts
    });
    this.props.history.push(`/events/${eventId}/chatrooms/${chatroomId}`);
  }

  async navEvent(eventId) {
    const chatrooms = await getChatrooms(eventId);
    this.setState({
      chatrooms
    });
    this.props.history.push(`/events/${eventId}`);
  }

  navLogin() {
    this.props.history.push(`/login`);
  }

  navRegister() {
    this.props.history.push(`/`);
  }

  render() {
    return (
      <div className="App">
        <Header
          handleLogout={this.handleLogout}
          username={this.state.user.username}
          navLogin={this.navLogin}
          navRegister={this.navRegister}/>
        <Main
          handleChange={this.handleChange}
          handleRegister={this.handleRegister}
          handleLogin={this.handleLogin}
          username={this.state.registerForm.username}
          email={this.state.registerForm.email}
          password={this.state.registerForm.password}
          navLogin={this.navLogin}
          navRegister={this.navRegister}
          navEvent={this.navEvent}
          navChatroom={this.navChatroom}
          events={this.state.events}
          chatrooms={this.state.chatrooms}
          posts={this.state.posts}/>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
