import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { loginUser,
  createUser,
  updateToken,
  getEvents,
  getChatrooms,
  getPosts,
  getUser,
  createPost,
  deletePost,
  updatePost,
  getChatroomUsers } from './services/apiHelper';
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
      userChatrooms: [],
      registerForm: {
        username: '',
        email: '',
        password: ''
      },
      editFormId: null,
      editText: '',
      text: '',
      events: [],
      chatrooms: [],
      posts: []
    }

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.navLogin = this.navLogin.bind(this);
    this.navRegister = this.navRegister.bind(this);
    this.navEvent = this.navEvent.bind(this);
    this.navChatroom = this.navChatroom.bind(this);
    this.navHome = this.navHome.bind(this);
    this.navBackEvent = this.navBackEvent.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.removePost = this.removePost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.makeEditForm = this.makeEditForm.bind(this);
    this.navProfile = this.navProfile.bind(this);

  }

  async componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      const user = decode(token);
      this.setState({
        user
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.props.history.push(`/events`);
      const events = await getEvents();
      this.setState({
        events
      })
    }
  }

  handleChangeText(ev) {
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    })
  }

  async handleSubmitText(ev) {
    ev.preventDefault();
    const string = this.props.history.location.pathname;
    const chatroomId = string.match(/\d+/g).map(Number)[1];

    const newPost = await createPost({
      text: this.state.text,
      chatroom_id: chatroomId
    });

    this.setState(prevState => ({
      text: '',
      posts: [...prevState.posts, newPost]
    }));
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
    this.props.history.push(`/events`);
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
    this.props.history.push(`/events`);
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

  async getUsers(posts) {
    if (posts) {
      const usernames = posts.map(async (post) => {
        const user = await getUser(post.user_id);
        return user
      });
      return await Promise.all(usernames);
    }
  }

  makeEditForm(formId, text) {
    this.setState({
      editFormId: formId,
      editText: text
    })
  }

  async editPost(postId, arrayId) {
    const string = this.props.history.location.pathname;
    const chatroomId = string.match(/\d+/g).map(Number)[1];

    const newPost = await updatePost(postId, {
      text: this.state.editText,
      chatroom_id: chatroomId
    });

    const newPosts = [...this.state.posts];
    newPosts[arrayId] = newPost.post;
    this.setState({
      editText: '',
      posts: newPosts
    });
  }

  async removePost(postId) {
    await deletePost(postId);
    this.setState({
      posts: this.state.posts.filter((post) => post.id !== postId)
    });
  }

  navBackEvent() {
    const eventString = this.props.history.location.pathname;
    const eventId = eventString.match(/\d+/g).map(Number)[0];
    this.props.history.push(`/events/${eventId}`);
  }

  navHome() {
    this.props.history.push(`/events`);
  }

  navLogin() {
    this.props.history.push(`/login`);
  }

  navRegister() {
    this.props.history.push(`/`);
  }

  async navProfile() {
    const userChatrooms = await getChatroomUsers(this.state.user.id)
    this.setState({
      userChatrooms
    })
    this.props.history.push(`/profile`)
  }

  render() {
    return (
      <div className="App">
        <Header
          handleLogout={this.handleLogout}
          username={this.state.user.username}
          navLogin={this.navLogin}
          navRegister={this.navRegister}
          navProfile={this.navProfile}/>
        <Main
          user={this.state.user}
          handleChangeText={this.handleChangeText}
          handleSubmitText={this.handleSubmitText}
          handleChange={this.handleChange}
          handleRegister={this.handleRegister}
          handleLogin={this.handleLogin}
          username={this.state.registerForm.username}
          email={this.state.registerForm.email}
          password={this.state.registerForm.password}
          navLogin={this.navLogin}
          navRegister={this.navRegister}
          navEvent={this.navEvent}
          navBackEvent={this.navBackEvent}
          navChatroom={this.navChatroom}
          navHome={this.navHome}
          events={this.state.events}
          chatrooms={this.state.chatrooms}
          posts={this.state.posts}
          getUsers={this.getUsers}
          text={this.state.text}
          removePost={this.removePost}
          makeEditForm={this.makeEditForm}
          editFormId={this.state.editFormId}
          editText={this.state.editText}
          editPost={this.editPost}/>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
