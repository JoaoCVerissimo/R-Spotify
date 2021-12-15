import React, { useEffect } from 'react';
import { spotifySearchCall } from '../../utils/spotifySearchCall';

const Track = ({ location: { state: { message } }, history }) => {

  const handleSearchClick = async () => {
    const paramsArray = [
      {
        q: message.searchText,
      }, {
        type: "track,artist,album",
      }, {
        limit: 5,
      }
    ];
    let token = localStorage.getItem("token");
    return await spotifySearchCall(paramsArray, token);
  }

  useEffect(async () => {
    if (!message) history.push("/dashboard");
    const detailsResponse = await handleSearchClick();
    if (detailsResponse?.error?.status || !localStorage.getItem("token")) return history.push("/");
    console.log(detailsResponse);
  }, []);


  return (
    <div>
      Agora meto aqui a página bonita
    </div>
  );
};

export default Track;
