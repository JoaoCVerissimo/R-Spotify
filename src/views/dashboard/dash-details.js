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

const Track = ({ location: { state: { message } }, history }) => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [artists, setArtists] = useState([]);

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

    console.log(detailsResponse.artists);
    setArtists(detailsResponse.artists.items);

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
    <>
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
                    <Typography variant="body2">There are currently at least <b>{artists.length}</b> artists with the name you entered</Typography>
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
              <Card sx={{ minWidth: 275, display: 'flex', marginTop: 2, }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Album details:</Typography>
                    {/* {tracks.map((track, index) => {
                return <Typography key={index} variant="body2"> <a href={track.uri}>{track.name}</a></Typography>;
              })} */}
                  </CardContent>
                </Box>
              </Card>
              :
              ""
            }
            {selected === "Track" ?
              <Card sx={{ minWidth: 275, display: 'flex', marginTop: 2, }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Track details:</Typography>
                    {/* {tracks.map((track, index) => {
                return <Typography key={index} variant="body2"> <a href={track.uri}>{track.name}</a></Typography>;
              })} */}
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
