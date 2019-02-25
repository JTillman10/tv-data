import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './ShowDetail.scss';

import { Overview } from '../../components/Show/Overview/Overview';
import Seasons from '../../components/Show/Seasons/Seasons';
import { Episode } from '../../components/Show/Episode/Episode';

import { getShow, getEpisode } from '../../store/show/show.actions';

class ShowDetail extends Component {
  componentDidMount() {
    this.props.onGetShow(this.props.match.params.showId);
  }

  episodeSelectedHandler = (seasonNumber, episodeNumber) => {
    this.props.onGetEpisode(this.props.match.params.showId, seasonNumber, episodeNumber);
  };

  selectSeasonHandler = () => {
    // TODO: add reset episode action
  };

  render() {
    if (this.props.showInfo) {
      return (
        <div className="section">
          <div className="container">
            <Overview
              name={this.props.showInfo.original_name}
              airDate={this.props.showInfo.first_air_date}
              summary={this.props.showInfo.overview}
            />
          </div>
          <div className="section">
            <div className="container">
              <Seasons
                showId={this.props.match.params.showId}
                totalSeasons={this.props.showInfo.number_of_seasons}
                selectEpisode={this.episodeSelectedHandler}
                selectSeason={this.selectSeasonHandler}
              />
            </div>
          </div>
          <div className="container">
            <Episode episode={this.props.selectedEpisode} />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return {
    showInfo: state.show.showInfo,
    selectedEpisode: state.show.selectedEpisode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetShow: showId => dispatch(getShow(showId)),
    onGetEpisode: (showId, seasonNumber, episodeNumber) =>
      dispatch(getEpisode(showId, seasonNumber, episodeNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShowDetail));
