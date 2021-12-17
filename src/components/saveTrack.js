import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import { spotifySaveTracksCall } from "../utils/spotifyDetailsCall";

import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';

const SaveTrack = ({ track }) => {
  const [saved, setSaved] = useState(false);
  const history = useHistory();

  const saveToLibrary = async (id) => {
    const token = localStorage.getItem("token");
    const result = await spotifySaveTracksCall(id, token);
    if (result?.error?.status || !token) return history.push("/");
    setSaved(true);
  }

  return (
    <Typography variant="body2">
      <Link style={{ textDecoration: "none" }} to={`/tracks/${track.id}`}>{track.name}</Link>
      <br />Save to your library:{" "}
      {saved ? <CheckIcon /> : <button className="follow-button" onClick={() => saveToLibrary(track.id)}>Save</button>}
    </Typography>
  )
}

export default SaveTrack;
