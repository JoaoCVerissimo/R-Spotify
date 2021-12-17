import React, { useEffect, useState } from 'react';
import { spotifySearchCall } from '../../utils/spotifySearchCall';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import AlbumIcon from '@mui/icons-material/Album';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import "./style.css"
import Follow from '../../components/follow';
import NavBar from "../../components/nav-bar";
import SaveAlbum from '../../components/saveAlbum';
import SaveTrack from '../../components/saveTrack';

const Track = ({ location: { state: { message } }, history }) => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  const handlePageInfo = async () => {
    const paramsArray = [
      {
        q: message.searchText,
      }, {
        type: "track,artist,album",
      }, {
        limit: 50,
      }
    ];
    let token = localStorage.getItem("token");
    const detailsResponse = await spotifySearchCall(paramsArray, token);
    if (detailsResponse?.error?.status || !token) return history.push("/");

    console.log(detailsResponse);
    setArtists(detailsResponse.artists.items);
    setAlbums(detailsResponse.albums.items);
    setTracks(detailsResponse.tracks.items);

    setLoading(false);
  }

  useEffect(() => {
    if (!message) history.push("/dashboard");
    handlePageInfo();
  }, []);

  const setArtist = () => setSelected("Artist");
  const setAlbum = () => setSelected("Album");
  const setTrack = () => setSelected("Track");

  return (
    <><NavBar />
      {loading ?
        <Box sx={{ display: 'flex' }} style={{ justifyContent: "center", marginTop: 50 }}><CircularProgress /></Box>
        :
        <div className="background">
          <h3>You searched for:<br /></h3>
          <p><em>{message.searchText}</em></p>
          <p>Select which category you would like to know more about</p>
          <div className="dash-options">
            <div className="artists" onClick={setArtist}>Artist<MicExternalOnIcon /></div>
            <div className="albums" onClick={setAlbum}>Album<AlbumIcon /></div>
            <div className="tracks" onClick={setTrack}>Track<AudiotrackIcon /></div>
          </div>
          <div>
            {selected === "Artist" ?
              <Card sx={{ minWidth: 275, display: 'flex', marginTop: 2, overflow: "scroll", maxHeight: 500 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Artist details:</Typography>
                    <Typography variant="body2">There are currently {artists.length === 0 ? "" : "at least"}<b>{artists.length}</b> artists with the name you entered</Typography>
                    <Typography variant="body2">
                      <b>Artists: </b>
                      {artists.map((artist, index) => <Follow artist={artist} key={index} />)}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
              : ""
            }
            {selected === "Album" ?
              <Card sx={{ minWidth: 275, display: 'flex', marginTop: 2, overflow: "scroll", maxHeight: 500 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Album details:</Typography>
                    <Typography variant="body2">There are currently at least <b>{albums.length}</b> albums associated with the name you entered</Typography>
                    {albums.map((album, index) => <SaveAlbum album={album} key={index} />)}
                  </CardContent>
                </Box>
              </Card>
              :
              ""
            }
            {selected === "Track" ?
              <Card sx={{ minWidth: 275, display: 'flex', marginTop: 2, overflow: "scroll", maxHeight: 500 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Track details:</Typography>
                    <Typography variant="body2">There are currently at least <b>{albums.length}</b> tracks associated with the name you entered</Typography>
                    {tracks.map((track, index) => <SaveTrack track={track} key={index} />)}
                  </CardContent>
                </Box>
              </Card>
              :
              ""
            }
          </div>
        </div>
      }
    </>
  );
};

export default Track;
