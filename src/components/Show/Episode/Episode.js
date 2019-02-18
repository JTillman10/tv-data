import React, { Fragment } from 'react';

export const Episode = props => {
  if (props.episode) {
    return (
      <Fragment>
        <h1 className="title is-uppercase is-2">{props.episode.Title}</h1>
        <div className="subtitle is-5 has-text-grey-light">{props.episode.Released}</div>
        <div className="subtitle is-4 has-text-grey-light">{props.episode.Plot}</div>
        {/* <div>Writers</div>
  <div>Actors</div>
  <div>imdbVotes</div> */}
      </Fragment>
    );
  } else {
    return <div />;
  }
};
