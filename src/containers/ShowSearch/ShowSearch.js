import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Autocomplete } from '../../components/UI/Autocomplete/Autocomplete';

import { APIKEY } from '../../axios/apiKey.constant';

class ShowSearch extends Component {
  state = {
    searchResults: []
  };

  onSearchedHandler = event => {
    const searchParameter = event.target.value;

    if (searchParameter.length > 3) {
      axios
        .get(`https://www.omdbapi.com/?apikey=${APIKEY}&type=series&s=${searchParameter}`)
        .then(response => {
          if (response.data.Response === 'True') {
            this.setState({ searchResults: response.data.Search });
          }
        });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  onSelectedHandler = selectedItemIndex => {
    const selectedShowId = this.state.searchResults[selectedItemIndex].imdbID;
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
