import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import { spotifySaveAlbumCall } from "../utils/spotifyDetailsCall";

import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';

const SaveAlbum = ({ album }) => {
  const [saved, setSaved] = useState(false);
  const history = useHistory();

  const saveToLibrary = async (id) => {
    const token = localStorage.getItem("token");
    const result = await spotifySaveAlbumCall(id, token);
    if (result?.error?.status || !token) return history.push("/");
    setSaved(true);
  }

  return (
    <Typography variant="body2">
      <a href={album.uri}>{album.name}</a><br />Save to your library:{" "}
      {saved ? <CheckIcon /> : <button className="follow-button" onClick={() => saveToLibrary(album.id)}>Save</button>}
    </Typography>
  )
}

export default SaveAlbum;
