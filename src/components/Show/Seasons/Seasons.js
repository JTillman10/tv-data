import React, { Component } from 'react';

import { RatingsChart } from './RatingsChart/RatingsChart';
import { SeasonList } from './SeasonsList/SeasonList';

export class Seasons extends Component {
  state = {
    selectedSeason: 1,
    episodes: null
  };

  selectSeasonHandler = event => {
    const newSeason = event.target.value;
    event.preventDefault();

    this.setState({ selectedSeason: newSeason });
  };

  //TODO: slide toggle for all seasons or individual season

  render() {
    return (
      <div className="box">
        <SeasonList
          currentSelectedSeason={this.state.selectedSeason}
          numberOfSeasons={this.props.totalSeasons}
          onSelectSeason={this.selectSeasonHandler}
        />
        <RatingsChart
          showId={this.props.showId}
          numberOfSeasons={this.props.totalSeasons}
          selectedSeason={this.state.selectedSeason}
          selectEpisode={this.props.selectEpisode}
        />
      </div>
    );
  }
}
