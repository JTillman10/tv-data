import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { Layout } from './components/hoc/Layout/Layout';

import Dashboard from './pages/Dashboard/Dashboard';
import ShowDetail from './pages/ShowDetail/ShowDetail';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/shows/:showId" exact component={ShowDetail} />
          <Route path="/" exact component={Dashboard} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
