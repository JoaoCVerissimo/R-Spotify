import React, { useEffect, useState } from "react";
import { spotifyArtistsCall, spotifyArtistTopTracksCall, spotifyArtistAlbumsCall, spotifyArtistFollowCall, spotifyArtistUnfollowCall } from "../../utils/spotifyDetailsCall";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Artist = ({ location: { state }, history }) => {
    const [follow, setFollow] = useState(true);
    const [loading, setLoading] = useState(true);

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

        const albumsResponse = await spotifyArtistAlbumsCall(state.id, token);
        if (albumsResponse?.error?.status || !token) return history.push("/");

        console.log(artistResponse, topTracksResponse, albumsResponse);
        setLoading(false);
    }

    const unfollowArtist = async () => {
        setFollow(!follow);
        const response = await spotifyArtistUnfollowCall(state.id, localStorage.getItem("token"));
        console.log("unfollow sucessfull");
    }

    const followArtist = async () => {
        setFollow(!follow);
        const response = await spotifyArtistFollowCall(state.id, localStorage.getItem("token"));
        console.log("follow sucessfull");
    }

    return (
        <>
            {loading ?
                <Box sx={{ display: 'flex' }} style={{ justifyContent: "center", marginTop: 50 }}><CircularProgress /></Box>
                :
                <div>
                    Agora meto aqui a página bonita com os dados retornados do artista: {state?.id}
                    <br />
                    <button onClick={follow ? unfollowArtist : followArtist}>{follow ? "Unfollow artist" : "Follow artist"}</button>
                </div>
            }
        </>
    );
};

export default Artist;
