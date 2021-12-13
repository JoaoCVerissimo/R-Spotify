import React from 'react';

import MainNav from './main-nav';

const NavBar = ({authenticated}) => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <MainNav show={authenticated}/>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
