import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetEpisodeStillUrls, GetImageUrl } from '../../../../api/show';

const OVERVIEW_LENGTH = 175;

export class Episode extends Component {
  state = {
    showAll: false,
    stillPath: null
  };

  componentDidMount() {
    GetEpisodeStillUrls(
      this.props.episode.show_id,
      this.props.episode.season_number,
      this.props.episode.episode_number
    ).then(response => {
      if (response.data.stills.length > 0) {
        const stillIndex = Math.floor(Math.random() * response.data.stills.length);
        const stillPath = response.data.stills[stillIndex].file_path;

        this.setState({ stillPath });
      }
    });
  }

  formatDate = date => {
    if (date) {
      let [year, month, day] = date.split('-');
      month = month[0] === '0' ? month[1] : month;
      return `${month}/${day}/${year}`;
    } else {
      return null;
    }
  };

  getPeriodIndex = overview => {
    return overview.indexOf('.', OVERVIEW_LENGTH);
  };

  formatOverview = (overview, periodIndex) => {
    const sliceIndex = periodIndex > 0 ? periodIndex + 1 : OVERVIEW_LENGTH;

    return overview.length > OVERVIEW_LENGTH && !this.state.showAll
      ? overview.slice(0, sliceIndex)
      : overview;
  };

  toggleShowAll() {
    this.setState(prevState => {
      return {
        ...prevState,
        showAll: !prevState.showAll
      };
    });
  }

  render() {
    const date = this.formatDate(this.props.episode.air_date);

    const periodIndex = this.getPeriodIndex(this.props.episode.overview);
    const overview = this.formatOverview(this.props.episode.overview, periodIndex);

    let caret;
    if (
      this.props.episode.overview.length > OVERVIEW_LENGTH &&
      periodIndex + 1 !== this.props.episode.overview.length
    ) {
      caret = (
        <button className="button" onClick={() => this.toggleShowAll()}>
          <span className="icon">
            <FontAwesomeIcon icon={this.state.showAll ? 'caret-up' : 'caret-down'} />
          </span>
        </button>
      );
    }

    let still;
    if (this.state.stillPath) {
      still = (
        <figure className="image">
          <img src={GetImageUrl(this.state.stillPath)} alt={this.props.episode.name} />
        </figure>
      );
    }

    return (
      <div className="columns is-vcentered">
        <div className="column is-1">
          <h1 className="title is-uppercase is-5">
            S{this.props.episode.season_number}E{this.props.episode.episode_number}
          </h1>
        </div>
        <div className="column is-2">{still}</div>
        <div className="column is-7">
          <h1 className="title is-uppercase is-4">{this.props.episode.name}</h1>
          <div className="subtitle is-6">{overview}</div>
        </div>
        <div className="column is-2">
          {caret}
          <h1 className="title is-5 has-text-grey is-pulled-right">{date}</h1>
        </div>
      </div>
    );
  }
}
