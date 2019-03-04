import React from 'react';

export const Episodes = props => {
  const formatDate = date => {
    let [year, month, day] = date.split('-');
    month = month[0] === '0' ? month[1] : month;
    return `${month}/${day}/${year}`;
  };

  if (props.episode) {
    return (
      <div className="box">
        <h1 className="title is-uppercase is-4">
          S{props.episode.season_number}E{props.episode.episode_number} - {props.episode.name}
        </h1>
        <div className="subtitle is-6 has-text-grey-light">
          {formatDate(props.episode.air_date)}
        </div>
        <div className="subtitle is-6 has-text-grey">{props.episode.overview}</div>
      </div>
    );
  } else {
    return <div />;
  }
};
