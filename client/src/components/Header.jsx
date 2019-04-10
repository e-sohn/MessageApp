import React from 'react';
import { withRouter } from 'react-router';
import { dropToken } from '../services/apiHelper';

const Header = (props) => {
  const token = localStorage.getItem('token');
  return (
    <header>
      <h1 className="title" onClick={props.navHome}>Messaging</h1>
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
        <p onClick={props.navProfile}>Welcome {props.username}</p>
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
