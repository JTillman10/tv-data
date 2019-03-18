import React, { Fragment } from 'react';
import { Navbar } from '../../UI/Navbar/Navbar';

export const Layout = props => {
  const { children } = props;
  return (
    <Fragment>
      <Navbar />
      <section className="hero">{children}</section>
    </Fragment>
  );
};
