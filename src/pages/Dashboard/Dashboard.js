import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class Dashboard extends Component {
  render() {
    return <section className="section">Dashboard</section>;
  }
}

export default withRouter(Dashboard);
