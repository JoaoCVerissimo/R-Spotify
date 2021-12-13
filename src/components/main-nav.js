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
    </div>
    :
    <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
    Login Page
    </NavLink>
    </div>
    }
  </>
  )
};

export default MainNav;
