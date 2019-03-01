import React from 'react';
import { NavLink } from 'react-router-dom';

import ShowSearch from '../../../containers/ShowSearch/ShowSearch';

export const Navbar = props => {
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink className="navbar-item" to={'/'} exact>
          DASHBOARD
        </NavLink>
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
