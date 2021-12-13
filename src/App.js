import React, {useEffect, useState} from "react";

import {useLocation} from "react-router-dom"
import { Route, Switch } from 'react-router-dom';

import Footer from './components/footer';
import NavBar from "./components/nav-bar";

import Dashboard from './views/dashboard/dashboard';
import Home from "./views/home/home";
import Album from "./views/album/album";
import Artist from "./views/artist/artist";
import Track from "./views/track/track";

import {spotifyAuthCall} from "./utils/spotifyAuthCall";

const App = () => {
    const [isAuth, setIsAuth] = useState(false);

    const location = useLocation();

    const authenticateUser = async (spotifyCode) => {
      const result = await spotifyAuthCall(spotifyCode);
      const status = localStorage.getItem('status');
      if(status === '200') setIsAuth(true);
      console.log(result, window.localStorage, status);
    };
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        setIsAuth(true);
      }else{
        const urlParams = new URLSearchParams(location.search);
        const spotifyCode = urlParams.get("code");
  
        if(!isAuth) authenticateUser(spotifyCode);
      }
    }, [location.search, isAuth]);
  
    const handleLoginClick = () => {
      // &scope=user-read-private
      const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}`;
      window.location.replace(spotifyURL)
    };

  return (
    <div className="d-flex flex-column h-100">
      <NavBar authenticated={isAuth}/>
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact><Home onClick={handleLoginClick}/></Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/albums" component={Album} />
          <Route path="/artists" component={Artist} />
          <Route path="/tracks" component={Track} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
