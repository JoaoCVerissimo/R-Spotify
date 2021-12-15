import React, { useEffect } from "react";
import { spotifyAlbumsCall } from "../../utils/spotifyDetailsCall";

const Album = ({ location: { state }, history }) => {
    useEffect(async () => {
        if (!state) history.push("/dashboard");
        const albumResponse = await spotifyAlbumsCall(state.id, localStorage.getItem("token"));
        if (albumResponse?.error?.status || !localStorage.getItem("token")) return history.push("/");
        console.log(albumResponse);
    }, []);

    return (
        <div>
            Agora meto aqui a página bonita com os dados retornados do endpoint com o id: {state?.id}
        </div>
    );
};

export default Album;
