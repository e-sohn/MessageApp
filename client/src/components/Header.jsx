import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { dropToken } from '../services/apiHelper';

const Header = (props) => {
  return (
    <header>
      <Link to="/home"><h1 className="title">octave.</h1></Link>
    </header>
  )
}

export default withRouter(Header);
