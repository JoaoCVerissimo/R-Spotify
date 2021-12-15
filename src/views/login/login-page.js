import React from "react";

import homeImage from "../../assets/spotify.jpg"
import NavBar from "../../components/nav-bar";

import "./style.css"


function LoginPage({onClick}) {
  const token = localStorage.getItem("token");

  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-left-child">
          <h3>Bem-vindo</h3>
          {token ?
          <h6>Desloca-te à dashboard para teres acesso aos teus artistas favoritos</h6>
          :
          <h6>Inicia sessão para teres acesso às tuas músicas e artistas favoritos</h6>}
          {token ? <></> : <button onClick={onClick}>Iniciar sessão</button>}
        </div>
        <div className="home-right-child" style={{backgroundImage: `url(${homeImage})`}}/>
      </div>
    </>
  );
};

export default LoginPage;
