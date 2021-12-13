import React from 'react';
import dashboardImage from "../../assets/home.jpeg";
import "./style.css";

const Dashboard = () => {

    const handleSearchClick = () => {

    }
    
    return (
        <div className="dashboard">
            <div style={{backgroundImage: `url(${dashboardImage})`}} className="image-cover-container"/>
            <h2 className="dashboard-title">Procura pelos teus artistas, albums ou músicas favoritas</h2>
            <div className="dashboard-searchbox">
                <input type="text" className="dashboard-searchbox-input"/>
                <button onClick={handleSearchClick} className="dashboard-searchbox-button">Procurar</button>
            </div>
        </div>
    );
};

export default Dashboard;
