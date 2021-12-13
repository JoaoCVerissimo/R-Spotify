import {NavLink} from "react-router-dom";
import React from "react";

function MainNav({show}){
  
  return(
  <>
    {show ? 
    <div className="navbar-nav mr-auto">
      <NavLink
        to="/dashboard"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
      Dashboard
      </NavLink>
      <NavLink
        to="/albums"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
      Albums
      </NavLink>
      <NavLink
        to="/artists"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
      Artists
      </NavLink>
      <NavLink
        to="/tracks"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
      Tracks
      </NavLink>
    </div>
    :
    <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
    Home
    </NavLink>
    </div>
    }
  </>
  )
};

export default MainNav;
