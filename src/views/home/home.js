import React from "react";

import homeImage from "../../assets/spotify.jpg"

import "./style.css"


function Home(props) {
  return (
    <div className="home-container">
      <div className="home-left-child">
        <h3>Bem-vindo</h3>
        <h6>Inicia sessão para teres acesso às tuas músicas favoritas</h6>
        <button onClick={props.onClick}>Iniciar sessão</button>
      </div>
      <div className="home-right-child" style={{backgroundImage: `url(${homeImage})`}}/>
    </div>
  );
};

export default Home;
