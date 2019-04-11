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
        <button
          className="register-login-button"
          value={props.value}
          onSubmit={props.handleSubmit}>Submit</button>
      </form>
      <div className="register-login-buttons">
        <button className="register-button" onClick={props.navRegister}>Register Form</button>
        <button className="login-button" onClick={props.navLogin}>Log In Form</button>
      </div>
    </div>
  )
};

export default Register;
