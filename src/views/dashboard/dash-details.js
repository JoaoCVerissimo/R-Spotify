import React, { useEffect, useState } from 'react';
import { spotifySearchCall } from '../../utils/spotifySearchCall';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import "./style.css"

const Track = ({ location: { state: { message } }, history }) => {
  const [loading, setLoading] = useState(true);

  const handlePageInfo = async () => {
    const paramsArray = [
      {
        q: message.searchText,
      }, {
        type: "track,artist,album",
      }, {
        limit: 50,
      }
    ];
    let token = localStorage.getItem("token");
    const detailsResponse = await spotifySearchCall(paramsArray, token);
    if (detailsResponse?.error?.status || !token) return history.push("/");

    console.log(detailsResponse);

    setLoading(false);
  }

  useEffect(() => {
    if (!message) history.push("/dashboard");
    handlePageInfo();
  }, []);


  return (
    <>
      {loading ?
        <Box sx={{ display: 'flex' }} style={{ justifyContent: "center", marginTop: 50 }}><CircularProgress /></Box>
        :
        <div className="background">

        </div>
      }
    </>
  );
};

export default Track;
