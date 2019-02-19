import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { Layout } from './components/hoc/Layout/Layout';

import ShowSearch from './containers/ShowSearch/ShowSearch';
import ShowDetail from './containers/ShowDetail/ShowDetail';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/shows/:showId" exact component={ShowDetail} />
          <Route path="/" exact component={ShowSearch} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
