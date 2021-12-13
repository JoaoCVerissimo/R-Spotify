import React, { useState } from 'react';
import dashboardImage from "../../assets/home.jpeg";

import { spotifySearchCall } from '../../utils/spotifySearchCall';

import "./style.css";

const Dashboard = ({token}) => {
    const [searchText, setSearchText] = useState("");

    const handleSearchClick = async () => {
        const paramsArray = [
        {
            q: searchText,
        },{
            type: "track,artist,album",
        },{
            limit: 5,
        }
        ];
        const response = await spotifySearchCall(paramsArray, token);
        console.log(response);
    }

    return (
        <div className="dashboard">
            <div style={{backgroundImage: `url(${dashboardImage})`}} className="image-cover-container"/>
            <h2 className="dashboard-title">Procura pelos teus artistas, albums ou músicas favoritas</h2>
            <div className="dashboard-searchbox">
                <input type="text" className="dashboard-searchbox-input" value={searchText} onChange={({target : {value}}) => setSearchText(value)}/>
                <button onClick={handleSearchClick} className="dashboard-searchbox-button">Procurar</button>
            </div>
            <div className="my-top-five">
                <div className="followed">Followed</div>
                <div className="saved-tracks">Saved Tracks</div>
                <div className="saved-albums">Saved Albums</div>
            </div>
        </div>
    );
};

export default Dashboard;
