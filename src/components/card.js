import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
const Str = require('@supercharge/strings')

export default function BasicCard(props) {
    const {albums, onClickAlbum} = props;
    const {tracks, onClickTrack} = props;
    const {artists, onClickArtist} = props;

    if(props.type === "album"){
        return (
            <Card sx={{ minWidth: 275 , display: 'flex'}}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>Your Top 5 saved albums:</Typography>
                        {albums.map((album, index) => {
                            return <Typography key={index} sx={{ mb: 0.2 }} color="text.secondary" onClick={onClickAlbum} style={{cursor: 'pointer'}}>{Str(album.album.name).limit(25, '...').get()}</Typography>
                        })}
                    </CardContent>
                </Box>
            </Card>
        );
    }
    else if(props.type === "tracks"){
        return (
            <Card sx={{ minWidth: 275 , display: 'flex'}}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>Your Top 5 saved tracks:</Typography>
                        {tracks.map((track, index) => {
                            return <Typography key={index} sx={{ mb: 0.2 }} color="text.secondary" onClick={onClickTrack} style={{cursor: 'pointer'}}>{Str(track.track.name).limit(25, '...').get()}</Typography>
                        })}
                    </CardContent>
                </Box>
            </Card>
        );
    }else{
        return (
            <Card sx={{ minWidth: 275 , display: 'flex'}}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>Your Top 5 followed artists:</Typography>
                        {/* substituir por um map depois */}
                        {/*<Typography sx={{ mb: 0.2 }} color="text.secondary" onClick={onClickArtist} style={{cursor: 'pointer'}}>{Str(tracks[0].track.name).limit(25, '...').get()}</Typography>
                        <Typography sx={{ mb: 0.2 }} color="text.secondary" onClick={onClickArtist} style={{cursor: 'pointer'}}>{Str(tracks[1].track.name).limit(25, '...').get()}</Typography>
                        <Typography sx={{ mb: 0.2 }} color="text.secondary" onClick={onClickArtist} style={{cursor: 'pointer'}}>{Str(tracks[2].track.name).limit(25, '...').get()}</Typography>
                        <Typography sx={{ mb: 0.2 }} color="text.secondary" onClick={onClickArtist} style={{cursor: 'pointer'}}>{Str(tracks[3].track.name).limit(25, '...').get()}</Typography>
                        <Typography sx={{ mb: 0.2 }} color="text.secondary" onClick={onClickArtist} style={{cursor: 'pointer'}}>{Str(tracks[4].track.name).limit(25, '...').get()}</Typography> */}
                    </CardContent>
                </Box>
            </Card>
        );
    }
}
