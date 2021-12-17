import React from "react";

import { Route, Switch } from 'react-router-dom';

import Footer from './components/footer';

import Dashboard from './views/dashboard/dashboard';
import DashDetails from './views/dashboard/dash-details';
import LoginPage from "./views/login/login-page";
import Logout from "./views/logout/logout";
import Album from "./views/album/album";
import Artist from "./views/artist/artist";
import Track from "./views/track/track";
import Callback from "./views/callback/callback";
import { BrowserRouter as Router } from "react-router-dom";

const scope = "user-top-read user-read-playback-state user-read-private user-follow-modify user-read-playback-position user-follow-read user-library-modify user-library-read user-read-email playlist-read-collaborative playlist-modify-public playlist-read-private user-read-recently-played user-read-currently-playing"
const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=${scope}`;

const App = () => {
  const handleLoginClick = () => {
    window.location.replace(spotifyURL);
  };

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <div className="container-fluid flex-grow-1">
          <Switch>
            <Route path="/" exact><LoginPage onClick={handleLoginClick} /></Route>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/albums/:id" component={Album} />
            <Route path="/artists/:id" component={Artist} />
            <Route path="/tracks/:id" component={Track} />
            <Route path="/callback" component={Callback} />
            <Route path="/logout" component={Logout} />
            <Route path="/dash-details" component={DashDetails} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
