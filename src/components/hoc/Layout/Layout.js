import React, { Fragment } from 'react';
import { Navbar } from '../../UI/Navbar/Navbar';

export const Layout = props => {
  return (
    <Fragment>
      <Navbar />
      <section className="hero">{props.children}</section>
    </Fragment>
  );
};
