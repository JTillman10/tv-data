import React, { Component } from 'react';

import { Layout } from './components/hoc/Layout/Layout';

import { ShowSearch } from './containers/ShowSearch/ShowSearch';

class App extends Component {
  render() {
    return (
      <Layout>
        <ShowSearch />
      </Layout>
    );
  }
}

export default App;
