import React, { useEffect, useState } from "react";
import { spotifyAlbumsCall, spotifyAlbumTracksCall, spotifySaveAlbumCall } from "../../utils/spotifyDetailsCall";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Album = ({ location: { state }, history }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!state) history.push("/dashboard");
        handlePageInfo();
    }, []);

    const handlePageInfo = async () => {
        const token = localStorage.getItem("token");

        const albumResponse = await spotifyAlbumsCall(state.id, token);
        if (albumResponse?.error?.status || !token) return history.push("/");

        const AlbumTracksResponse = await spotifyAlbumTracksCall(state.id, token);
        if (AlbumTracksResponse?.error?.status || !token) return history.push("/");

        const saveAlbumResponse = await spotifySaveAlbumCall(state.id, token);
        if (saveAlbumResponse?.error?.status || !token) return history.push("/");

        console.log(albumResponse, AlbumTracksResponse, saveAlbumResponse);

        setLoading(false);
    }

    return (
        <>
            {loading ?
                <Box sx={{ display: 'flex' }} style={{ justifyContent: "center", marginTop: 50 }}><CircularProgress /></Box>
                :
                <div>
                    Agora meto aqui a página bonita com os dados retornados do endpoint com o id: {state?.id}
                </div>
            }
        </>
    );
};

export default Album;
