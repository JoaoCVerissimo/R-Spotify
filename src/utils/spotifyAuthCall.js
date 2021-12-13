// Aqui vou trocar o codigo pelo token e guardar na local storage
const commonParams = {
    redirect_uri : process.env.REACT_APP_SPOTIFY_CALLBACK_HOST,
    client_id : process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    client_secret : process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
}

export const spotifyAuthCall = async (code) => {
    let myStorage = window.localStorage;
    try {
        const params = {
            code,
            grant_type: 'authorization_code',
            ...commonParams,
        };
    
        const searchParams = Object.keys(params).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])).join("&");

        const URL = "https://accounts.spotify.com/api/token";
        const spotifyCall = await fetch(URL, {
            method: "POST",
            body: searchParams,
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
        });

        let status = spotifyCall.status;
        const result = await spotifyCall.json();
        myStorage.setItem("token", result.access_token);
        myStorage.setItem("status", status);
        return result;
    } catch (error) {
        console.log(error);
    }
}
