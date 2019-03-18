import React from 'react';
import { NavLink } from 'react-router-dom';

import ShowSearch from '../../ShowSearch/ShowSearch';

export const Navbar = props => {
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to={'/'} exact>
            DASHBOARD
          </NavLink>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item is-expanded">
              <ShowSearch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
