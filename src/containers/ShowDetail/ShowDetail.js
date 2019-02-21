import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './ShowDetail.scss';

import { GetShow, GetEpisode } from '../../axios/tv';

import { Overview } from '../../components/Show/Overview/Overview';
import { Seasons } from '../../components/Show/Seasons/Seasons';
import { Episode } from '../../components/Show/Episode/Episode';

class ShowDetail extends Component {
  state = {
    showInfo: null,
    selectedEpisode: null
  };

  componentDidMount() {
    GetShow(this.props.match.params.showId).then(response => {
      this.setState({ showInfo: response.data });
    });
  }

  episodeSelectedHandler = (seasonNumber, episodeNumber) => {
    GetEpisode(this.props.match.params.showId, seasonNumber, episodeNumber).then(response => {
      this.setState({ selectedEpisode: response.data });
    });
  };

  render() {
    if (this.state.showInfo) {
      return (
        <div className="section">
          <div className="container">
            <Overview data={this.state.showInfo} />
          </div>
          <div className="section">
            <div className="container">
              <Seasons
                showId={this.props.match.params.showId}
                totalSeasons={this.state.showInfo.number_of_seasons}
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

export default withRouter(ShowDetail);
