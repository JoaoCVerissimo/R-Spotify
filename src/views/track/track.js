import React, { useEffect, useState } from 'react';
import { spotifyTracksCall, spotifySaveTracksCall } from "../../utils/spotifyDetailsCall";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import "./style.css";

const Track = ({ location: { state }, history }) => {
    const [loading, setLoading] = useState(true);
    const [albumImage, setAlbumImage] = useState();
    const [trackArtists, setTrackArtists] = useState([]);
    const [track, setTrack] = useState({});

    useEffect(() => {
        if (!state) history.push("/dashboard");
        handlePageInfo();
    }, []);

    const handlePageInfo = async () => {
        const token = localStorage.getItem("token");

        const trackResponse = await spotifyTracksCall(state.id, token);
        if (trackResponse?.error?.status || !token) return history.push("/");

        const saveTrackResponse = await spotifySaveTracksCall(state.id, token);
        if (saveTrackResponse?.error?.status || !token) return history.push("/");

        setLoading(false);

        setTrack(trackResponse);
        setAlbumImage(trackResponse.album.images[0].url);
        setTrackArtists(trackResponse.artists)
    }

    return (
        <>
            {loading ?
                <Box sx={{ display: 'flex' }} style={{ justifyContent: "center", marginTop: 50 }}><CircularProgress /></Box>
                :
                <div className="main-container">
                    <div className="head-container">
                        <span className="button-dashboard" onClick={() => history.push("/dashboard")}><a href="#"></a></span>
                        <h3 className="rainbow rainbow_text_animated">Album Cover</h3>
                        <div className="image-container">
                            <img src={albumImage} alt="cover" style={{ width: 320, height: 320 }} />
                        </div>
                    </div>
                    <div className="body-container">
                        <div className="left-container">
                            <Card sx={{ minWidth: 275, display: 'flex' }}>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Basic track info:</Typography>
                                        {trackArtists.map((artist, index) => {
                                            return <Typography key={index} variant="body2"> Artist-{index + 1}: {artist.name} </Typography>
                                        })}
                                        <Typography variant="body2"> Name: {track.name} </Typography>
                                        <Typography variant="body2"> Duration: {track.duration_ms / 1000} seconds</Typography>
                                        <Typography variant="body2"> Listen to the song: <a href={track.uri}>{track.name}</a></Typography>
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

export default Track;
