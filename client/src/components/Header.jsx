import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { dropToken } from '../services/apiHelper';

const Header = (props) => {
  const token = localStorage.getItem('token');
  return (
    <header>
      <Link to="/home"><h1 className="title">Messaging</h1></Link>
      { window.location.pathname !== "/login" &&
      window.location.pathname !== "/" &&
      !token &&
        <p onClick={props.navRegister}>Register</p>
      }
      { window.location.pathname !== "/login" &&
      window.location.pathname !== "/" &&
      !token &&
        <p onClick={props.navLogin}>Login</p>
      }
      { token &&
        <p>Welcome {props.username}</p>
      }
      { token &&
        <p className="nav-link" onClick={() => {
          dropToken();
          props.handleLogout();
          props.history.push(`/`);
          }}>Sign Out</p>
      }
    </header>
  )
}

export default withRouter(Header);
