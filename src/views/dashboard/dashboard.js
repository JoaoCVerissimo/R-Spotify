import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import dashboardImage from "../../assets/home.jpeg";
import { spotifyFollowedArtistCall, spotifySavedTracksCall, spotifyAlbumsTracksCall } from "../../utils/spotifyMeCall";

import BasicCard from "../../components/card";
import SearchBar from '../../components/search-bar';

import "./style.css";

const Dashboard = (props) => {
    const [searchText, setSearchText] = useState("");
    const [followed, setFollowed] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    const handlePageInfo = async (token) => {
        const followedParamsArray = [{limit: 5,}];
        const followedResponse = await spotifyFollowedArtistCall(followedParamsArray, token);
        if(followedResponse?.error?.status) props.history.push("/")

        const tracksParamsArray = [{limit: 5,},{market: "PT"}];
        const tracksResponse = await spotifySavedTracksCall(tracksParamsArray, token);
        if(tracksResponse?.error?.status) props.history.push("/")
        
        const albumsParamsArray = [{limit: 5,},{market: "PT"}];
        const albumsResponse = await spotifyAlbumsTracksCall(albumsParamsArray, token);
        if(albumsResponse?.error?.status) props.history.push("/")

        setFollowed(followedResponse.items);
        setTracks(tracksResponse.items);
        setAlbums(albumsResponse.items);

        console.log(followedResponse, tracksResponse, albumsResponse);
        setLoading(false);
    }

    const redirectToAlbumDetails = () => { props.history.push("/albums") }
    const redirectToTrackDetails = () => { props.history.push("/tracks") }
    const redirectToArtistDetails = () => { props.history.push("/artists") }

    const setSearch = (value) => { setSearchText(value) }

    useEffect(() => {
        let token = localStorage.getItem("token");
        handlePageInfo(token);
    },[]);

    return (
        <div className="dashboard">
            <div style={{backgroundImage: `url(${dashboardImage})`}} className="image-cover-container"/>
            <h2 className="dashboard-title">Procura pelos teus artistas, albums ou músicas favoritas</h2>
            <SearchBar searchText={searchText} setSearch={setSearch} />
            {loading ? 
            <Box sx={{ display: 'flex' }} style={{justifyContent: "center", marginTop: 50}}>
                <CircularProgress />
            </Box>
            :
            <div className="my-top-five">
                <div className="followed">
                <BasicCard type={"followed"} artists={followed} onClickArtist={redirectToArtistDetails}/>
                </div>
                <div className="saved-tracks">
                <BasicCard type={"tracks"} tracks={tracks} onClickTrack={redirectToTrackDetails}/>
                </div>
                <div className="saved-albums">
                <BasicCard type={"album"} albums={albums} onClickAlbum={redirectToAlbumDetails}/>
                </div>
            </div>
            }
        </div>
    );
};

export default Dashboard;
