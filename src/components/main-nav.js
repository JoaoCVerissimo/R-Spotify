import { NavLink } from "react-router-dom";
import React from "react";

function MainNav() {
  const token = localStorage.getItem("token");
  return (
    <>
      {token ?
        <div className="navbar-nav w-100 justify-content-between">
          <NavLink
            to="/dashboard"
            exact
            className="nav-link"
            activeClassName="router-link-exact-active"
            activeStyle={{
              fontWeight: "bold",
            }}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/logout"
            exact
            className="nav-link"
            activeClassName="router-link-exact-active"
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            Logout
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
