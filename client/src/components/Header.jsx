import React from 'react';
import { withRouter } from 'react-router';
import { dropToken } from '../services/apiHelper';

const Header = (props) => {
  const token = localStorage.getItem('token');
  return (
    <div className="header">
      <p className="title" onClick={props.navHome}>Messaging</p>
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
        <nav>
          <a className="nav-link" onClick={props.navProfile}>Welcome {props.username}</a>
          <a className="nav-link" onClick={() => {
            dropToken();
            props.handleLogout();
            props.history.push(`/`);
          }}>Sign Out</a>
        </nav>
      }
    </div>
  )
}

export default withRouter(Header);
