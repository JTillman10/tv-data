import React, { Component } from 'react';

import { Layout } from './components/hoc/Layout/Layout';

import { ShowSearch } from './containers/ShowSearch/ShowSearch';
import { ShowDetail } from './containers/ShowDetail/ShowDetail';

class App extends Component {
  render() {
    return (
      <Layout>
        {/* <ShowSearch /> */}
        <ShowDetail />
      </Layout>
    );
  }
}

export default App;
