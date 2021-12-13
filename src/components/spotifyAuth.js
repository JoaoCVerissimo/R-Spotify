// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SpotifyAuth = (props) => {
//     const redirect_uri = process.env.REACT_APP_SPOTIFY_CALLBACK_HOST;
//     const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
//     const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    
//     const [token, setToken] = useState;

//     useEffect(() => {
//         axios('https://accounts.spotify.com/api/token', {
//             'method': 'POST',
//             'form':{
//                 code: props.code,
//                 redirect_uri: redirect_uri,
//                 grant_type: 'authorization_code'
//             },
//             'headers':{
//                 'Content-Type':'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//             }
//         }).then(tokenresponse => {
//             console.log(tokenresponse.data.access_token);
//             //setToken(tokenresponse.data.access_token);
//         }).catch(error => console.log(error));
//     },[])

//     return (<></>)
// }

// export default SpotifyAuth;
