import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import dashboardImage from "../../assets/home.jpeg";
import { spotifyFollowedArtistCall, spotifySavedTracksCall, spotifyAlbumsCall } from "../../utils/spotifyMeCall";

import BasicCard from "../../components/card";
import SearchBar from '../../components/search-bar';
import NavBar from "../../components/nav-bar";

import "./style.css";

const Dashboard = (props) => {
    const [followed, setFollowed] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    const handlePageInfo = async (token) => {
        const followedParamsArray = [{ type: "artist", }, { limit: 5, }];
        const followedResponse = await spotifyFollowedArtistCall(followedParamsArray, token);
        if (followedResponse?.error?.status || !localStorage.getItem("token")) return props.history.push("/");

        const tracksParamsArray = [{ limit: 5, }, { market: "PT" }];
        const tracksResponse = await spotifySavedTracksCall(tracksParamsArray, token);
        if (tracksResponse?.error?.status || !localStorage.getItem("token")) return props.history.push("/");

        const albumsParamsArray = [{ limit: 5, }, { market: "PT" }];
        const albumsResponse = await spotifyAlbumsCall(albumsParamsArray, token);
        if (albumsResponse?.error?.status || !localStorage.getItem("token")) return props.history.push("/");

        setFollowed(followedResponse.artists.items);
        setTracks(tracksResponse.items);
        setAlbums(albumsResponse.items);
        setLoading(false);
    }

    const redirectToAlbumDetails = (id) => { props.history.push({ pathname: "/albums", state: { id } }) }
    const redirectToTrackDetails = (id) => { props.history.push({ pathname: "/tracks", state: { id } }) }
    const redirectToArtistDetails = (id) => { props.history.push({ pathname: "/artists", state: { id } }) }

    useEffect(() => {
        let token = localStorage.getItem("token");
        handlePageInfo(token);
    }, []);

    return (
        <>
            <NavBar />
            <div className="dashboard">
                <div style={{ backgroundImage: `url(${dashboardImage})` }} className="image-cover-container" />
                <h2 className="dashboard-title">Procura pelos teus artistas, albums ou músicas favoritas</h2>
                <SearchBar props={props} />
                {loading ?
                    <Box sx={{ display: 'flex' }} style={{ justifyContent: "center", marginTop: 50 }}><CircularProgress /></Box>
                    :
                    <div className="my-top-five">
                        <div className="followed">
                            <BasicCard type={"followed"} artists={followed} onClickArtist={(id) => redirectToArtistDetails(id)} />
                        </div>
                        <div className="saved-tracks">
                            <BasicCard type={"tracks"} tracks={tracks} onClickTrack={(id) => redirectToTrackDetails(id)} />
                        </div>
                        <div className="saved-albums">
                            <BasicCard type={"album"} albums={albums} onClickAlbum={(id) => redirectToAlbumDetails(id)} />
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Dashboard;
