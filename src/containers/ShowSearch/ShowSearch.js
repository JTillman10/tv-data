import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Autocomplete } from '../../components/UI/Autocomplete/Autocomplete';

import { Search } from '../../axios/search';

class ShowSearch extends Component {
  state = {
    searchResults: []
  };

  onSearchedHandler = event => {
    const searchParameter = event.target.value;

    if (searchParameter.length > 3) {
      Search.get(``, { params: { query: searchParameter } }).then(response => {
        this.setState({ searchResults: response.data.results });
      });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  onSelectedHandler = selectedItemIndex => {
    const selectedShowId = this.state.searchResults[selectedItemIndex].id;
    this.props.history.push(`/shows/${selectedShowId}`);
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <form>
            <Autocomplete
              searched={this.onSearchedHandler}
              selected={this.onSelectedHandler}
              searchResults={this.state.searchResults}
            />
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(ShowSearch);
