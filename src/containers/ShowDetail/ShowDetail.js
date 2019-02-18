import React, { Component } from 'react';
import axios from 'axios';
import { APIKEY } from '../../axios/apiKey.constant';

import './ShowDetail.scss';

import { Overview } from '../../components/Show/Overview/Overview';
import { Seasons } from '../../components/Show/Seasons/Seasons';
import { Episode } from '../../components/Show/Episode/Episode';

export class ShowDetail extends Component {
  state = {
    showId: 'tt0944947',
    showInfo: null,
    selectedEpisode: null
  };

  componentDidMount() {
    axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${this.state.showId}`).then(response => {
      this.setState({ showInfo: response.data });
    });
  }

  episodeSelectedHandler = newEpisodeId => {
    axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${newEpisodeId}`).then(response => {
      this.setState({ selectedEpisode: response.data });
    });
  };

  render() {
    if (this.state.showInfo) {
      return (
        <div>
          <div className="container">
            <Overview data={this.state.showInfo} />
          </div>
          <div className="section">
            <div className="container">
              <Seasons
                showId={this.state.showId}
                totalSeasons={this.state.showInfo.totalSeasons}
                selectEpisode={this.episodeSelectedHandler}
              />
            </div>
          </div>
          <div className="container">
            <Episode episode={this.state.selectedEpisode} />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
