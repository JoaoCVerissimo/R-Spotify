import React, { useEffect, useState } from "react";
import { spotifyAlbumsCall, spotifyAlbumTracksCall, spotifySaveAlbumCall } from "../../utils/spotifyDetailsCall";

import { useParams } from "react-router";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import CheckIcon from '@mui/icons-material/Check';

import "./style.css";

const Album = ({ location: { state }, history }) => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [albumImage, setAlbumImage] = useState();
  const [albumArtist, setAlbumArtist] = useState();
  const [album, setAlbum] = useState({});
  const [saved, setSaved] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) history.push("/");
    handlePageInfo();
  }, []);

  const handlePageInfo = async () => {
    const token = localStorage.getItem("token");

    const albumResponse = await spotifyAlbumsCall(id, token);
    if (albumResponse?.error?.status || !token) return history.push("/");

    const AlbumTracksResponse = await spotifyAlbumTracksCall(id, token);
    if (AlbumTracksResponse?.error?.status || !token) return history.push("/");

    setAlbum(albumResponse);
    setAlbumImage(albumResponse.images[0]?.url);
    setAlbumArtist(albumResponse.artists[0].name);
    setTracks(AlbumTracksResponse.items);
    setLoading(false);
  }

  const saveAlbum = async () => {
    const token = localStorage.getItem("token");
    const saveAlbumResponse = await spotifySaveAlbumCall(id, token);
    if (saveAlbumResponse?.error?.status || !token) return history.push("/");

    setSaved(true);
  }

  return (
    <>
      {loading ?
        <Box sx={{ display: 'flex' }} style={{ justifyContent: "center", marginTop: 50 }}><CircularProgress /></Box>
        :
        <div className="main-container">
          <div className="head-container">
            <span className="button-dashboard" onClick={() => history.push("/dashboard")}><a href="#"></a></span>
            <h3 className="rainbow rainbow_text_animated">Cover Image</h3>
            <div className="image-container">
              <img src={albumImage} alt="cover" style={{ width: 320, height: 320 }} />
            </div>
          </div>
          <div className="body-container">
            <div className="left-container">
              <Card sx={{ minWidth: 275, display: 'flex' }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Album info:</Typography>
                    <Typography variant="body2"> <b>From:</b> {albumArtist} </Typography>
                    <Typography variant="body2"> <b>Name:</b> {album.name} </Typography>
                    <Typography variant="body2"> <b>Release date:</b> {album.release_date} </Typography>
                    <Typography variant="body2"> <b>Total tracks:</b> {album.total_tracks} </Typography>
                    <Typography variant="body2"><b>Save the album: </b>{saved ? <CheckIcon /> : <button className="follow-button" onClick={saveAlbum}>Add to library</button>}</Typography>
                  </CardContent>
                </Box>
              </Card>
            </div>
            <div className="right-container">
              <Card sx={{ minWidth: 275, display: 'flex' }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Album tracks with spotify links:</Typography>
                    {tracks.map((track, index) => {
                      return <Typography key={index} variant="body2"> <a href={track.uri}>{track.name}</a></Typography>;
                    })}
                  </CardContent>
                </Box>
              </Card>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Album;
