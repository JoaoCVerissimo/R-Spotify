import React, { useEffect, useState } from 'react';
import { spotifyTracksCall, spotifySaveTracksCall } from "../../utils/spotifyDetailsCall";

import { useParams } from "react-router";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CheckIcon from '@mui/icons-material/Check';

import "./style.css";

const Track = ({ location: { state }, history }) => {
    const [loading, setLoading] = useState(true);
    const [albumImage, setAlbumImage] = useState();
    const [trackArtists, setTrackArtists] = useState([]);
    const [track, setTrack] = useState({});
    const [saved, setSaved] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) history.push("/");
        handlePageInfo();
    }, []);

    const handlePageInfo = async () => {
        const token = localStorage.getItem("token");

        const trackResponse = await spotifyTracksCall(id, token);
        if (trackResponse?.error?.status || !token) return history.push("/");

        setTrack(trackResponse);
        setAlbumImage(trackResponse.album.images[0]?.url);
        setTrackArtists(trackResponse.artists)
        setLoading(false);
    }

    const saveTrack = async () => {
        const token = localStorage.getItem("token");
        const saveTrackResponse = await spotifySaveTracksCall(id, token);
        if (saveTrackResponse?.error?.status || !token) return history.push("/");

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
                                        <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Basic track info: </Typography>
                                        {trackArtists.map((artist, index) => {
                                            return <Typography key={index} variant="body2"> <b>Artist-{index + 1}: </b> {artist.name} </Typography>
                                        })}
                                        <Typography variant="body2"> <b>Name: </b> {track.name} </Typography>
                                        <Typography variant="body2"> <b>Duration: </b> {track.duration_ms / 1000} seconds</Typography>
                                        <Typography variant="body2"> <b>Listen to the song: </b> <a href={track.uri}>{track.name}</a></Typography>
                                        <Typography variant="body2"><b>Save the track: </b>{saved ? <CheckIcon /> : <button className="follow-button" onClick={saveTrack}>Add to library</button>}</Typography>
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
