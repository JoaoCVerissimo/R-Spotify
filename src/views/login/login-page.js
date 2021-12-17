import React from "react";

import homeImage from "../../assets/spotify.jpg"
import NavBar from "../../components/nav-bar";

import "./style.css"


function LoginPage({ onClick }) {
  const token = localStorage.getItem("token");

  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-left-child">
          <h3>Welcome</h3>
          {token ?
            <h6>Go to the dashboard to access your favorite artists</h6>
            :
            <h6>Sign in to have access to your favorite songs and artists</h6>}
          {token ? <></> : <button onClick={onClick}>Sign in</button>}
        </div>
        <div className="home-right-child" style={{ backgroundImage: `url(${homeImage})` }} />
      </div>
    </>
  );
};

export default LoginPage;
