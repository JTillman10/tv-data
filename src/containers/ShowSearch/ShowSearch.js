import React, { Component } from 'react';
import axios from 'axios';

import { Autocomplete } from '../../components/UI/Autocomplete/Autocomplete';

import { APIKEY } from '../../axios/apiKey.constant';

export class ShowSearch extends Component {
  state = {
    searchResults: []
  };

  onSearchedHandler = event => {
    const searchParameter = event.target.value;

    if (searchParameter.length > 3) {
      axios
        .get(`http://www.omdbapi.com/?apikey=${APIKEY}&type=series&s=${searchParameter}`)
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
