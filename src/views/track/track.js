import React, { useEffect, useState } from 'react';
import { spotifyTracksCall, spotifySaveTracksCall } from "../../utils/spotifyDetailsCall";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Track = ({ location: { state }, history }) => {
    const [loading, setLoading] = useState(true);

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

export default Track;
