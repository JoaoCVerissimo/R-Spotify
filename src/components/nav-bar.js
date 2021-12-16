import React from 'react';

import MainNav from './main-nav';

const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <MainNav />
      </nav>
    </div>
  );
};

export default NavBar;
