import React, { useState } from 'react';
import "../views/dashboard/style.css";

const SearchBar = ({ props }) => {
    const [searchText, setSearchText] = useState("");

    const redirectToDetails = () => { props.history.push({ pathname: "/dash-details", state: { message: { searchText } } }) }
    const setSearch = (value) => { setSearchText(value) }
    return (
        <div className="dashboard-searchbox">
            <input type="text" className="dashboard-searchbox-input" value={searchText} onChange={({ target: { value } }) => setSearch(value)} />
            <button onClick={redirectToDetails} className="dashboard-searchbox-button">Procurar</button>
        </div>
    );
};

export default SearchBar;
