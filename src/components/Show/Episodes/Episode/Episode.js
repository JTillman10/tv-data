import React from 'react';

export const Episode = props => {
  const formatDate = date => {
    let [year, month, day] = date.split('-');
    month = month[0] === '0' ? month[1] : month;
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="columns">
      <div className="column is-2">
        <h1 className="title is-uppercase is-4">
          S{props.episode.season_number}E{props.episode.episode_number}
        </h1>
      </div>
      <div className="column is-8">
        <h1 className="title is-uppercase is-4">{props.episode.name}</h1>
        <div className="subtitle is-6">{props.episode.overview}</div>
      </div>
      <div className="column is-2 has-text-right">
        <h1 className="title is-5 has-text-grey">{formatDate(props.episode.air_date)}</h1>
      </div>
    </div>
  );
};
