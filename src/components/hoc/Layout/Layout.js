import React from 'react';

export const Layout = props => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item has-text-white" href="/">
                BULMA
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="hero-body">{props.children}</div>
    </section>
  );
};
