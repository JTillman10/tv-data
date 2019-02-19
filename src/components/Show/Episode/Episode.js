import React from 'react';

export const Episode = props => {
  if (props.episode) {
    return (
      <div className="box">
        <h1 className="title is-uppercase is-4">
          S{props.episode.Season}E{props.episode.Episode} - {props.episode.Title}
        </h1>
        <div className="subtitle is-6 has-text-grey-light">{props.episode.Released}</div>
        <div className="subtitle is-6 has-text-grey">{props.episode.Plot}</div>
        {/* <div>Writers</div>
  <div>Actors</div>
  <div>imdbVotes</div> */}
      </div>
    );
  } else {
    return <div />;
  }
};
