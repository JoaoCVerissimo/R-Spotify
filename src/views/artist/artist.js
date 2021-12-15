import React, { useEffect } from "react";
import { spotifyArtistsCall } from "../../utils/spotifyDetailsCall";

const Artist = ({ location: { state }, history }) => {
    useEffect(async () => {
        if (!state) history.push("/dashboard");
        const artistResponse = await spotifyArtistsCall(state.id, localStorage.getItem("token"));
        if (artistResponse?.error?.status || !localStorage.getItem("token")) return history.push("/");
        console.log(artistResponse);
    }, []);

    return (
        <div>
            Agora meto aqui a página bonita com os dados retornados do endpoint com o id: {state?.id}
        </div>
    );
};

export default Artist;
