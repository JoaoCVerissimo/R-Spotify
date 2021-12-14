import React from 'react';
import "../views/dashboard/style.css";

import { spotifySearchCall } from '../utils/spotifySearchCall';

const SearchBar = (props) => {
    const {searchText, setSearch} = props;
    
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
        let token = localStorage.getItem("token");
        const response = await spotifySearchCall(paramsArray, token);
        if(response?.error?.status) props.history.push("/")
        console.log(response);
    }

    return (
    <div className="dashboard-searchbox">
        <input type="text" className="dashboard-searchbox-input" value={searchText} onChange={({target : {value}}) => setSearch(value)}/>
        <button onClick={handleSearchClick} className="dashboard-searchbox-button">Procurar</button>
    </div>
    );
};

export default SearchBar;
