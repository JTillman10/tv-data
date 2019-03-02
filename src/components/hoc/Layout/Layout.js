import React, { Fragment } from 'react';
import { Navbar } from '../../UI/Navbar/Navbar';

export const Layout = props => {
  return (
    <Fragment>
      <Navbar />
      <section className="hero is-fullheight">{props.children}</section>
    </Fragment>
  );
};
