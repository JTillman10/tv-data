import React, { Component } from 'react';
import axios from 'axios';

import { Autocomplete } from '../../components/UI/Autocomplete/Autocomplete';

const apiKey = '6cddc8d7';

export class ShowSearch extends Component {
  state = {
    searchResults: []
  };

  onSearchedHandler = event => {
    const searchParameter = event.target.value;

    if (searchParameter.length > 3) {
      axios
        .get(`http://www.omdbapi.com/?apikey=${apiKey}&r=json&type=series&s=${searchParameter}`)
        .then(response => {
          if (response.data.Response === 'True') {
            this.setState({ searchResults: response.data.Search });
          }
        });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  onSelectedHandler = selectedShowIndex => {
    console.log(this.state.searchResults[selectedShowIndex]);
  };

  render() {
    return (
      <div className="container">
        <div className="is-vcentered">
          <form>
            <Autocomplete
              searched={this.onSearchedHandler}
              selected={this.onSelectedHandler}
              searchResults={this.state.searchResults}
            />
          </form>
        </div>
      </div>
    );
  }
}
