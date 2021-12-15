import React, { useEffect } from 'react';
import { spotifyTracksCall } from "../../utils/spotifyDetailsCall";

const Track = ({ location: { state }, history }) => {
    useEffect(async () => {
        if (!state) history.push("/dashboard");
        const trackResponse = await spotifyTracksCall(state.id, localStorage.getItem("token"));
        if (trackResponse?.error?.status || !localStorage.getItem("token")) return history.push("/");
        console.log(trackResponse);
    }, []);

    return (
        <div>
            Agora meto aqui a página bonita com os dados retornados do endpoint com o id: {state?.id}
        </div>
    );
};

export default Track;
