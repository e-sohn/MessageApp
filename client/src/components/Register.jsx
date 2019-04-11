import React from 'react';

const Register = (props) => {
  return (
    <div className="auth">
      <form
        onSubmit={props.handleSubmit}
        className="register-form">
        { window.location.pathname !== "/login" &&
         <input
          className="register-input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={props.handleChange}
          value={props.username}
          required />
        }
         <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={props.handleChange}
          value={props.email}
          required />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={props.handleChange}
          value={props.password}
          required />
        <input
          type="submit"
          value={props.value}
          onSubmit={props.handleSubmit} />
      </form>
      <div className="register-login-buttons">
        <p className="register-button" onClick={props.navRegister}>Register</p>
        <p className="login-button" onClick={props.navLogin}>Log In</p>
      </div>
    </div>
  )
};

export default Register;
