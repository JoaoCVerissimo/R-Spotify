import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import { spotifyArtistFollowCall, spotifyArtistUnfollowCall } from "../utils/spotifyDetailsCall";

import Typography from '@mui/material/Typography';

const Follow = ({ artist }) => {
  const [follow, setFollow] = useState(false);
  const history = useHistory();

  const followArtist = async (id) => {
    const token = localStorage.getItem("token");
    let result;
    follow ? result = await spotifyArtistUnfollowCall(id, token) : result = await spotifyArtistFollowCall(id, token);
    if (result?.error?.status || !token) return history.push("/");
    setFollow(!follow);
  }

  return (
    <Typography variant="body2">
      <a href={artist.uri}>{artist.name}</a><br />Follow:{" "}
      <button className="follow-button" onClick={() => followArtist(artist.id)}> {follow ? "Unfollow artist" : "Follow artist"}</button>
    </Typography>
  )
}

export default Follow;
