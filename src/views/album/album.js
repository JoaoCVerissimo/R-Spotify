import React, {useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Album = ({location: {state}, history}) => {
    useEffect(() => {
        if(!state) history.push("/dashboard");
    }, []);
    return (
        <div>{state?.id}</div>
    );
};

export default Album;
