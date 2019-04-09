import React from 'react';

const Register = (props) => {
  return (
    <form
      onSubmit={props.handleRegister}
      className="register-form">
      <div>
       <input
        className="register-input"
        type="text"
        name="username"
        placeholder="Username"
        onChange={props.handleChange}
        value={props.username}
        required />
       <input
        className="register-input"
        type="email"
        name="email"
        placeholder="email"
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
        onSubmit={props.handleRegister} />
      </div>
    </form>
  )
};

export default Register;
