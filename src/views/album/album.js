import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Album = () => {
    return (
        <Box sx={{ display: 'flex' }} style={{justifyContent: "center"}}>
            <CircularProgress />
        </Box>
    );
};

export default Album;
