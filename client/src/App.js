import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { loginUser, createUser, updateToken } from './services/apiHelper';
import { withRouter } from 'react-router'
import decode from 'jwt-decode'

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
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      const user = decode(token);
      this.setState({
        user
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.props.history.push(`/home`);
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
    await updateToken(newUser.token);
    this.setState({
      registerForm: {
        username: '',
        email: '',
        password: ''
      }
    });
    this.props.history.push(`/home`);
  }

  async handleLogin(ev) {
    ev.preventDefault();
    const user = await loginUser({
      email: this.state.registerForm.email,
      password: this.state.registerForm.password
    });
    await updateToken(user.token);
    this.setState({
      registerForm: {
        username: '',
        email: '',
        password: ''
      }
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
    })
  }

  render() {
    return (
      <div className="App">
        <Header
          handleLogout={this.handleLogout}/>
        <Main
          handleChange={this.handleChange}
          handleRegister={this.handleRegister}
          handleLogin={this.handleLogin}
          username={this.state.registerForm.username}
          email={this.state.registerForm.email}
          password={this.state.registerForm.password}/>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
