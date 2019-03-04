import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OVERVIEW_LENGTH = 175;

export class Episode extends Component {
  state = {
    showAll: false
  };

  formatDate = date => {
    let [year, month, day] = date.split('-');
    month = month[0] === '0' ? month[1] : month;
    return `${month}/${day}/${year}`;
  };

  formatOverview = overview => {
    return overview.length > OVERVIEW_LENGTH && !this.state.showAll
      ? overview.slice(0, overview.indexOf('.', OVERVIEW_LENGTH) + 1)
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
    const overview = this.formatOverview(this.props.episode.overview);

    let caret;
    if (this.props.episode.overview.length > OVERVIEW_LENGTH) {
      caret = (
        <button className="button is-pulled-right" onClick={() => this.toggleShowAll()}>
          <span className="icon">
            <FontAwesomeIcon icon={this.state.showAll ? 'caret-down' : 'caret-up'} />
          </span>
        </button>
      );
    }

    return (
      <div className="columns">
        <div className="column is-2">
          <h1 className="title is-uppercase is-4">
            S{this.props.episode.season_number}E{this.props.episode.episode_number}
          </h1>
        </div>
        <div className="column is-7">
          <h1 className="title is-uppercase is-4">{this.props.episode.name}</h1>
          <div className="subtitle is-6">{overview}</div>
        </div>
        <div className="column is-1">{caret}</div>
        <div className="column is-2">
          <h1 className="title is-5 has-text-grey is-pulled-right">{date}</h1>
        </div>
      </div>
    );
  }
}
