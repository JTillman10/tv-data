import React from 'react';
import ShowSearch from '../../../containers/ShowSearch/ShowSearch';

export const Navbar = props => {
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          TVDATA
        </a>
      </div>
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <div className="navbar-item">
            <ShowSearch />
          </div>
        </div>
        <div className="navbar-end" />
      </div>
    </nav>
  );
};
