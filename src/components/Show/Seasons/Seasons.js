import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RatingsChart } from './RatingsChart/RatingsChart';
import { SeasonList } from './SeasonsList/SeasonList';

import { getEpisodesForSeason, updateSelectedSeason } from '../../../store/show/show.actions';

export class Seasons extends Component {
  selectSeasonHandler = event => {
    const newSeasonNumber = event.target.value;
    event.preventDefault();

    this.props.selectSeason();

    this.props.onUpdateSelectedSeason(newSeasonNumber);
    this.props.onGetEpisodesForSeason(this.props.showId, newSeasonNumber, this.props.totalSeasons);
  };

  componentDidMount() {
    this.props.onGetEpisodesForSeason(
      this.props.showId,
      this.props.selectedSeason,
      this.props.totalSeasons
    );
  }

  render() {
    return (
      <div className="box">
        <SeasonList
          currentSelectedSeason={this.props.selectedSeason}
          numberOfSeasons={this.props.totalSeasons}
          onSelectSeason={this.selectSeasonHandler}
        />
        <RatingsChart
          showId={this.props.showId}
          episodes={this.props.episodes}
          numberOfSeasons={this.props.totalSeasons}
          selectedSeason={this.props.selectedSeason}
          onSelectEpisode={this.props.selectEpisode}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedSeason: state.show.selectSeason,
    episodes: state.show.episodes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetEpisodesForSeason: (showId, newSeasonNumber, totalSeasons) =>
      dispatch(getEpisodesForSeason(showId, newSeasonNumber, totalSeasons)),
    onUpdateSelectedSeason: newSeasonNumber => dispatch(updateSelectedSeason(newSeasonNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seasons);
