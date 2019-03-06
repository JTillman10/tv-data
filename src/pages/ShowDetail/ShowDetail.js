import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './ShowDetail.scss';

import { Overview } from '../../components/Show/Overview/Overview';
import { RatingsChart } from '../../components/Show/RatingsChart/RatingsChart';
import { SeasonList } from '../../components/Show/SeasonsList/SeasonList';
import Episodes from '../../components/Show/Episodes/Episodes';

import {
  getShow,
  updateSelectedSeason,
  getEpisodesForSeason,
  selectEpisode
} from '../../store/show/show.actions';

export class ShowDetail extends Component {
  componentDidMount() {
    this.props.onGetShow(this.props.match.params.showId);
    this.props.onGetEpisodesForSeason(this.props.match.params.showId, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.showId !== nextProps.match.params.showId) {
      this.props.onGetShow(nextProps.match.params.showId);
      this.props.onGetEpisodesForSeason(nextProps.match.params.showId, 1);
    }
  }

  episodeSelectedHandler = selectedEpisodeId => {
    this.props.onEpisodeSelected(selectedEpisodeId);
  };

  seasonSelectedHandler = event => {
    const newSeasonNumber = event.target.value;
    event.preventDefault();

    this.props.onUpdateSelectedSeason(newSeasonNumber);
    this.props.onGetEpisodesForSeason(
      this.props.match.params.showId,
      newSeasonNumber,
      this.props.showInfo.number_of_seasons
    );
  };

  render() {
    if (this.props.showInfo) {
      return (
        <section className="section is-paddingless">
          <div className="container">
            <Overview
              name={this.props.showInfo.original_name}
              airDate={this.props.showInfo.first_air_date}
              summary={this.props.showInfo.overview}
            />
          </div>
          <section className="section is-paddingless">
            <div className="container">
              <div className="box">
                <SeasonList
                  currentSelectedSeason={this.props.selectedSeason}
                  numberOfSeasons={this.props.showInfo.number_of_seasons}
                  onSelectSeason={this.seasonSelectedHandler}
                />
                <RatingsChart
                  showId={this.props.match.params.showId}
                  episodes={this.props.episodes}
                  numberOfSeasons={this.props.showInfo.number_of_seasons}
                  selectedSeason={this.props.selectedSeason}
                  onSelectEpisode={this.episodeSelectedHandler}
                  selectedEpisodeId={this.props.selectedEpisodeId}
                />
              </div>
            </div>
          </section>
          <div className="container">
            <Episodes />
          </div>
        </section>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return {
    showInfo: state.show.showInfo,
    selectedSeason: state.show.selectedSeason,
    episodes: state.show.episodes,
    selectedEpisodeId: state.show.selectedEpisodeId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetShow: showId => dispatch(getShow(showId)),
    onGetEpisodesForSeason: (showId, newSeasonNumber, totalSeasons) =>
      dispatch(getEpisodesForSeason(showId, newSeasonNumber, totalSeasons)),
    onUpdateSelectedSeason: newSeasonNumber => dispatch(updateSelectedSeason(newSeasonNumber)),
    onEpisodeSelected: selectedEpisodeId => dispatch(selectEpisode(selectedEpisodeId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShowDetail));
