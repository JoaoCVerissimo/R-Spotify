import React, { useEffect, useState } from "react";
import { spotifyArtistsCall, spotifyArtistTopTracksCall, spotifyArtistAlbumsCall, spotifyArtistFollowCall, spotifyArtistUnfollowCall } from "../../utils/spotifyDetailsCall";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import "./style.css";

const Artist = ({ location: { state }, history }) => {
    const [follow, setFollow] = useState(true);
    const [loading, setLoading] = useState(true);
    const [artist, setArtist] = useState();
    const [artistImage, setArtistImage] = useState();
    const [artistGenres, setArtistGenres] = useState([]);
    const [artistTopTracks, setArtistTopTracks] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState([]);

    useEffect(() => {
        if (!state) history.push("/dashboard");
        handlePageInfo();
    }, []);

    const handlePageInfo = async () => {
        const token = localStorage.getItem("token");

        const artistResponse = await spotifyArtistsCall(state.id, token);
        if (artistResponse?.error?.status || !token) return history.push("/");

        const topTracksResponse = await spotifyArtistTopTracksCall(state.id, token);
        if (topTracksResponse?.error?.status || !token) return history.push("/");

        const artistAlbumsResponse = await spotifyArtistAlbumsCall(state.id, token);
        if (artistAlbumsResponse?.error?.status || !token) return history.push("/");

        setArtist(artistResponse);
        setArtistImage(artistResponse.images[0]?.url);
        setArtistGenres(artistResponse.genres);
        setArtistTopTracks(topTracksResponse.tracks);
        setArtistAlbums(artistAlbumsResponse.items);
        setLoading(false);
    }

    const unfollowArtist = async () => {
        const token = localStorage.getItem("token");
        const result = await spotifyArtistUnfollowCall(state.id, token);
        if (result?.error?.status || !token) return history.push("/");

        setFollow(!follow);
    }

    const followArtist = async () => {
        const token = localStorage.getItem("token");
        const result = await spotifyArtistFollowCall(state.id, localStorage.getItem("token"));
        if (result?.error?.status || !token) return history.push("/");

        setFollow(!follow);
    }

    return (
        <>
            {loading ?
                <Box sx={{ display: 'flex' }} style={{ justifyContent: "center", marginTop: 50 }}><CircularProgress /></Box>
                :
                <div className="main-container">
                    <div className="head-container">
                        <span className="button-dashboard" onClick={() => history.push("/dashboard")}><a href="#"></a></span>
                        <h3 className="rainbow rainbow_text_animated">{artist.name}</h3>
                        <div className="image-container">
                            <img src={artistImage} alt="cover" style={{ width: 320, height: 320 }} />
                        </div>
                    </div>
                    <div className="body-container">
                        <div className="left-container">
                            <Card sx={{ minWidth: 275, display: 'flex' }}>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Basic artist info:</Typography>
                                        <Typography variant="body2"><b>Name:</b> {artist.name} </Typography>
                                        <Typography variant="body2"><b>Genres played:</b>
                                            {artistGenres.map((genre, index) => {
                                                return (index + 1) < artistGenres.length ? " " + genre + ", " : genre + ".";
                                            })} </Typography>
                                        <Typography variant="body2"> <b>Check out the artist:</b><a href={artist.uri}> {artist.name}</a></Typography>
                                        <Typography variant="body2">Would you like to follow the artist? If so, press the button: <button className="follow-button" onClick={follow ? unfollowArtist : followArtist}>{follow ? "Unfollow artist" : "Follow artist"}</button></Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        </div>
                        <div className="mid-container">
                            <Card sx={{ minWidth: 275, display: 'flex' }}>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Top 5 tracks:</Typography>
                                        {artistTopTracks.map((track, index) => {
                                            if (index <= 4) return <Typography key={index} variant="body2"> <a href={track.uri}>{track.name}</a></Typography>;
                                        })}
                                    </CardContent>
                                </Box>
                            </Card>
                        </div>
                        <div className="right-container">
                            <Card sx={{ minWidth: 275, display: 'flex' }}>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>Albums:</Typography>
                                        {artistAlbums.map((album, index) => {
                                            return (
                                                <div key={index + 1000} className="dashboard-searchbox" style={{ justifyContent: "flex-start" }}>
                                                    <img key={index + 100} src={album?.images[0]?.url} alt="album" style={{ width: 25, height: 25, marginRight: 5 }} />
                                                    <Typography key={index} variant="body2"><a href={album.uri}>{album.name}</a></Typography>
                                                </div>
                                            )
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

export default Artist;
