import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../views/dashboard/style.css"
const Str = require('@supercharge/strings')

export default function BasicCard(props) {
    const { albums, onClickAlbum } = props;
    const { tracks, onClickTrack } = props;
    const { artists, onClickArtist } = props;

    if (props.type === "album") {
        return (
            <Card sx={{ minWidth: 275, display: 'flex' }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>Your Top 5 saved albums:</Typography>
                        {albums.map(({ album }, index) => {
                            return (
                                <div key={index + 1000} className="dashboard-searchbox" style={{ justifyContent: "flex-start" }}>
                                    <img key={index + 100} src={album.images[0].url} alt="album" style={{ width: 25, height: 25, marginRight: 5 }} />
                                    <Typography key={index} sx={{ mb: 0.2 }} color="text.secondary" onClick={() => onClickAlbum(album.id)} style={{ cursor: 'pointer' }}>{Str(album.name).limit(20, '...').get()}</Typography>
                                </div>
                            )
                        })}
                    </CardContent>
                </Box>
            </Card>
        );
    }
    else if (props.type === "tracks") {
        return (
            <Card sx={{ minWidth: 275, display: 'flex' }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>Your Top 5 saved tracks:</Typography>
                        {tracks.map((track, index) => {
                            return <Typography key={index} sx={{ mb: 0.2 }} color="text.secondary" onClick={() => onClickTrack(track.track.id)} style={{ cursor: 'pointer' }}>{Str(track.track.name).limit(25, '...').get()}</Typography>
                        })}
                    </CardContent>
                </Box>
            </Card>
        );
    } else {
        return (
            <Card sx={{ minWidth: 275, display: 'flex' }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>5 Artists you follow:</Typography>
                        {artists.map((artist, index) => {
                            return <Typography key={index} sx={{ mb: 0.2 }} color="text.secondary" onClick={() => onClickArtist(artist.id)} style={{ cursor: 'pointer' }}>{Str(artist.name).limit(25, '...').get()}</Typography>;
                        })}
                    </CardContent>
                </Box>
            </Card>
        );
    }
}
